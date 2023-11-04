import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchLevel =  async() => {
  const requestUrl = `${API_BASE_URL}/master-management/talent-level-option-lists`;
  return await axios.get(requestUrl);
};

export const fetchPosition = async() => {
  const requestUrl = `${API_BASE_URL}/master-management/talent-position-option-lists`;
  return await axios.get(requestUrl);
};

export const fetchSkillsetTypeOptions = async() => {
  const requestUrl = `${API_BASE_URL}/master-management/skillset-type-options`;
  return await axios.get(requestUrl);
};

export const fetchEmployeeStatus =  async() => {
  const requestUrl = `${API_BASE_URL}/master-management/employee-status-option-lists`;
  return await axios.get(requestUrl);
};

export const fetchTalentStatus =  async() => {
  const requestUrl = `${API_BASE_URL}/master-management/talent-status-option-lists`;
  return await axios.get(requestUrl);
};

export const fetchWishlist = async (userId) => {
  const requestUrl = `${API_BASE_URL}/talent-management/wishlists?userId=${userId}`;
  return await axios.get(requestUrl);
};

export const removeWishlist = async (userId, wishlistId) => {
  const requestUrl = `${API_BASE_URL}/talent-management/wishlists/remove`;
  const reqBody = {
    userId: userId,
    wishlistId: wishlistId,
  };
  return await axios.put(requestUrl, reqBody);
};

export const downloadCV = async (talentId) => {
  const requestUrl = `${API_BASE_URL}/talents/download-cv?talentId=${talentId}`;
  return await axios.get(requestUrl, { responseType: 'arraybuffer' });
};

export const removeAllWishlist = async (userId) => {
  const requestUrl = `${API_BASE_URL}/talent-management/wishlists/remove-all?userId=${userId}`;
  return await axios.put(requestUrl);
};

export const requestAllWishlist = async (userId, wishlistData) => {
  const requestUrl = `${API_BASE_URL}/talent-management/wishlists/request`;
  const reqBody = {
    userId: userId,
    wishlist: wishlistData,
  };
  return await axios.post(requestUrl, reqBody);
};

export const fetchPopularTags = async () => {
  const requestUrl = `${API_BASE_URL}/tags-management/popular-tags-option-lists`;
  return axios.get(requestUrl);
};

export const fetchTags = async (inputValue) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags-management/tags-option-lists`, {
      params: { tags: inputValue },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const experienceLevels = [
  { id: 1, name: '5+ Years of Experience', min: 5, max: 100 },
  { id: 2, name: '2 - 4 Years of Experience', min: 2, max: 4 },
  { id: 3, name: '1 Year of Experience', min: 1, max: 1 },
];

function mapExperienceToYears(selectedExperience) {
  let experienceYearMinArr = [];
  let experienceYearMaxArr = [];
  
  if (selectedExperience && selectedExperience.length > 0) {
    selectedExperience = selectedExperience.sort((a, b) => b - a);
    selectedExperience.forEach((selectedId) => {
      const level = experienceLevels.find((level) => level.id === selectedId);
      if (level) {
        experienceYearMinArr.push(level.min);
        experienceYearMaxArr.push(level.max);
      }
    });
  }else{
    experienceYearMinArr = [0];
    experienceYearMaxArr = [100]; 
  }

  console.log("sell " + selectedExperience);
  console.log("Min: " + Math.min(...experienceYearMinArr) + " Max"+ Math.min(...experienceYearMaxArr));

  const experienceYearMin = Math.min(...experienceYearMinArr);
  const experienceYearMax = Math.max(...experienceYearMaxArr);

  return { experienceYearMin, experienceYearMax };
}



export const fetchTalentsWithPagination = async (currentPage, entriesPerPage, sortBy, filterParam) => {
  const requestUrl = `${API_BASE_URL}/talent-management/talents`;

  console.log(filterParam);

  const levelIdsString = filterParam.levelIds.join(',');
  const skillIdsString = filterParam.skillIds.join(',');
  const positionIdsString = filterParam.positionIds.join(',');
  const { experienceYearMin, experienceYearMax } = mapExperienceToYears(filterParam.experienceYear);

  return await axios.get(requestUrl, {
    params: {
      sortBy: sortBy,
      page: currentPage - 1,
      size: entriesPerPage,
      talentName: filterParam.talentName,
      levelIds: levelIdsString,
      skillIds: skillIdsString,
      positionIds: positionIdsString,
      experienceYearMin: experienceYearMin,
      experienceYearMax: experienceYearMax
    },
  });
};

export const fetchRequestData = async (requestUrl) => {
  try {
    const response = await axios.get(requestUrl);
    return await response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllRequestData = async (userId) => {
  const requestUrlMap = {
    0: `${API_BASE_URL}/talent-management/requests?userId=${userId}`,
    1: `${API_BASE_URL}/talent-management/requests?statusId=1&userId=${userId}`, // Approved
    2: `${API_BASE_URL}/talent-management/requests?statusId=2&userId=${userId}`, // Rejected
    3: `${API_BASE_URL}/talent-management/requests?statusId=3&userId=${userId}`, // On Progress
  };

  try {
    const requests = [
      fetchRequestData(requestUrlMap[0]),
      fetchRequestData(requestUrlMap[1]),
      fetchRequestData(requestUrlMap[2]),
      fetchRequestData(requestUrlMap[3]),
    ];

    return await Promise.all(requests);
  } catch (error) {
    throw error;
  }
};

export const fetchTalentData = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/talent-management/talents/${id}`);
    return await response.data;
  } catch (error) {
    throw error;
  }
};

export const addToWishlist = async (talentId, userId) => {
  try {
    const dataToSend = {
      talentId: talentId,
      userId: userId,
    };

    const response = await axios.post(`${API_BASE_URL}/talent-management/talents/add-to-list`, dataToSend);

    if (response.status === 200) {
      console.log('Add to list successful');
      return true;
    } else {
      console.error('Failed to add to list');
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (registrationData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(`${API_BASE_URL}/user-management/users/register`, registrationData, config);

    if (response.status === 201) {
      return true;
    } else {
      console.error('Register failed:', response);
      return false;
    }
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const signInUser = async (email, password) => {
  try {
    const signInData = {
      email: email,
      password: password,
    };

    const response = await axios.post(`${API_BASE_URL}/user-management/users/sign-in`, signInData);

    const token = response.headers['authorization'];
    const { userId, roleId, username } = response.data;

    // Store the token in a cookie
    Cookies.set('jwtToken', token, { expires: 7 });

    // Store user ID and role ID in local storage
    localStorage.setItem('userId', userId);
    localStorage.setItem('roleId', roleId);
    localStorage.setItem('username', username);
    localStorage.setItem('isLogin', 'true');

    return response;

  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const fetchTalentApprovalsWithPagination = async (currentPage, entriesPerPage, sortBy,  statusApprovalFilter, clientNameSearched) => {
  if(statusApprovalFilter === 'all'){
    statusApprovalFilter = '';
  }

  if(statusApprovalFilter === 'onprogress')(
    statusApprovalFilter = 'On Progress'
  )
  
  const requestUrl = `${API_BASE_URL}/talent-management/talent-approvals`;
  return await axios.get(requestUrl, {
    params: {
      sortBy: sortBy,
      page: currentPage - 1,
      size: entriesPerPage,
      status: statusApprovalFilter,
      agencyName: clientNameSearched
    },
  });
};

export const updateTalentApproval = async (talentRequestId, reqBody) => {
  try {
    return await axios.put(`${API_BASE_URL}/talent-management/talent-approvals/${talentRequestId}`, reqBody);
  } catch (error) {
    console.error('Error updating talent approval:', error);
    throw error;
  }
};

export const fetchAutocompleteClients = async (inputValue) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/client-management/client-option-lists`, {
      params: { agencyName: inputValue },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchAutocompleteTalents= async (inputValue) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/talent-management/talent-option-lists`, {
      params: { talentName: inputValue },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const addTalent = async (formData) => {
  // Cetak semua data dalam formData
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/talent-management/talents`, formData,  {
      headers: {
        'Content-Type': 'multipart/form-data',
        'enctype': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      console.log('Add to list successful');
      return true;
    } else {
      console.error('Failed to add to list');
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* ======================================== TEMPLATE =============================================================================== */

const USERS = {
  'USER_DUMMY::ADMIN': {
    username: 'USER_DUMMY::ADMIN',
    password: 'ADMIN',
    grants: [
      {
        name: 'ADMIN',
      },
    ],
  },
};

export const login = ({ username, password }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const user = USERS[username];
      if (user?.password === password) resolve(USERS[username]);
      else throw new Error(`Unknown user: { ${username} }. Please use { username: "USER_DUMMY::ADMIN", password: "ADMIN" }`);
    }, 250);
  });

export const logout = (payload) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, 125);
  });

/* ================================================================================================================================ */



