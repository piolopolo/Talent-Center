import { useState } from 'react';
import { Dialog, Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, HighlightOff } from '@mui/icons-material';

const GalleryCarousel = ({ items, activeIndex, onClose, onNext, onPrev }) => {
    return (
        <Box position="relative" width={500} height={400} overflow="hidden" sx={{ borderRadius : '10px' }}>
            {
                items.map((item, index) => (
                    <Box
                    key={index}
                    display={index === activeIndex ? 'block' : 'none'}
                    position="absolute"
                    style={{ cursor: 'pointer' }}
                    width="100%"
                    height="100%"
                    >
                    {item.type === 'image' ? (
                        <img
                        src={item.url}
                        alt={`Item ${index + 1}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        />
                    ) : (
                        <video
                        controls
                        width="100%"
                        height="100%"
                        style={{ objectFit: 'cover' }}
                        >
                        <source src={item.url} type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                    )}
                    </Box>
                ))
            }
            <IconButton
                onClick={onPrev}
                style={{ position: 'absolute', top: '50%', left: 0, color: 'white'}}
            >
                <ChevronLeft />
            </IconButton>
            <IconButton
                onClick={onNext}
                style={{ position: 'absolute', top: '50%', right: 0, color: 'white'}}
            >
                <ChevronRight />
            </IconButton>
            <IconButton
                onClick={onClose}
                size='large'
                style={{ position: 'absolute', top: 0, right: 0, color: 'white' }}
            >
                <HighlightOff />
            </IconButton>
        </Box>
    );
};

const GalleryModal = ({ items, open, initialIndex, onClose }) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };
    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    };
    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
    };

    const modalStyle = {
        maxHeight: '100vh',
        backgroundColor: 'transparent',
    };

    return (
        <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': modalStyle }}>
            <GalleryCarousel
                items={items}
                activeIndex={activeIndex}
                onClose={onClose}
                onPrev={handlePrev}
                onNext={handleNext}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                {items.map((item, index) => (
                    <Box
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '5px',
                            margin: '0.2rem',
                            cursor: 'pointer',
                            border: index === activeIndex ? '2px solid #2C8AD3' : '#DBDBDB',
                        }}
                    >
                        {item.type === 'image' ? (
                            <img
                                src={item.url}
                                alt={`Thumbnail ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <video
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            >
                                <source src={item.url} type="video/mp4" />
                            </video>
                        )}
                    </Box>
                ))}
            </Box>
        </Dialog>
    );
};

export default GalleryModal;