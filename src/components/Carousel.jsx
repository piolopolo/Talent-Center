import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Carousel = ({ items, onClickItem }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };
    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Box position="relative" width={300} height={200} overflow="hidden" sx={{ borderRadius : '10px' }}>
            {
                items.map((item, index) => (
                    <Box
                        key={index}
                        display={index === activeIndex ? 'block' : 'none'}
                        position="absolute"
                        onClick={() => onClickItem(index)}
                        style={{ cursor: 'pointer' }}
                        width="100%"
                        height="100%"
                        >
                        {item.type === 'image' ? (
                            <img
                            src={item.url}
                            alt={`Item ${index + 1}`}
                            style={{
                                width:"100%",
                                height:"100%",
                                objectFit: 'contain'
                            }}
                            />
                        ) : (
                            <video
                            controls
                            width="100%"
                            height="100%"
                            style={{ objectFit: 'cover', maxHeight: '100%' }}
                            >
                            <source src={item.url} type="video/mp4" />
                            Your browser does not support the video tag.
                            </video>
                        )}
                    </Box>
                ))
            }
            <IconButton
                onClick={handlePrev}
                style={{ position: 'absolute', top: '50%', left: 0, transform: 'none', color: 'white'}}
            >
                <ChevronLeft />
            </IconButton>
            <IconButton
                onClick={handleNext}
                style={{ position: 'absolute', top: '50%', right: 0, transform: 'none', color: 'white' }}
            >
                <ChevronRight />
            </IconButton>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                bottom="10px"
                left="0"
                right="0"
            >
                {items.map((_, index) => (
                    <Box
                        key={index}
                        width="8px"
                        height="8px"
                        borderRadius="50%"
                        backgroundColor={index === activeIndex ? '#2C8AD3' : '#DBDBDB'}
                        mx="2px"
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Carousel;

// import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "react-feather";
// import '../tailwindstyle.css'

// export default function Carousel({ children: slides}) {
//     const [curr, setCurr] = useState(0)
//     const prev = () => 
//         setCurr((curr) => (curr == 0 ? slides.length - 1 : curr - 1))
//         const next = () => 
//         setCurr((curr) => (curr == slides.length - 1 ? 0 : curr + 1))

//     return (
//         <div className="overflow-hidden relative">
//             <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)` }}>{slides}</div>
//             <div className='absolute inset-0 flex items-center justify-between p-4'>
//                 <button onClick={prev} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
//                     <ChevronLeft size={15}></ChevronLeft>
//                 </button>
//                 <button onClick={next} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
//                     <ChevronRight size={15}></ChevronRight>
//                 </button>
//             </div>

//             <div className="absolute bottom-0 right-0 left-0" >
//                 <div className="flex items-center justify-center gap-2">
//                     {slides.map((_, i) => (
//                         <div
//                         className={`
//                         transition-all w-3 h-3 bg-white rounded-full
//                         ${curr === i ? "p-2" : "bg-opacity-50"}
//                         `}
//                         />
//                     ))}
//                 </div>
//             </div>

//         </div>  

//     )
// }