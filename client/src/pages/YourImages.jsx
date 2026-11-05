import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const YourImages = () => {
    const { backendUrl, token, user } = useContext(AppContext);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (!token) return;
                const { data } = await axios.get(`${backendUrl}/api/image/user-images`, {
                    headers: { token }
                });
                if (data.success) {
                    setImages(data.pictures);
                }
            } catch (error) {
                console.error("Error fetching images", error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, [backendUrl, token]);

    return (
        <div className="min-h-screen px-4 py-8 sm:px-10 md:px-14 lg:px-28">
            <h1 className="text-3xl font-bold text-white mb-8 text-center sm:text-left drop-shadow-md">
                Your Generated Images
            </h1>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-pink-500 rounded-full animate-bounce"></div>
                        <div className="w-5 h-5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            ) : !token ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-gray-300 text-lg mb-4 bg-white/10 px-6 py-4 rounded-xl border border-white/20 shadow-xl backdrop-blur-sm">Please log in to view your saved images.</p>
                </div>
            ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-gray-300 text-lg mb-4 bg-white/10 px-6 py-4 rounded-xl border border-white/20 shadow-xl backdrop-blur-sm">You haven't generated any images yet. Go create some magic!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((img) => (
                        <div key={img._id} className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-2 bg-gray-800 border border-gray-700">
                            <img 
                                src={img.image} 
                                alt={img.prompt} 
                                className="w-full h-auto object-cover aspect-square bg-gray-900"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <p className="text-white text-sm font-medium line-clamp-3 leading-relaxed">{img.prompt}</p>
                                <p className="text-pink-400 text-xs mt-2 font-semibold tracking-wide uppercase">
                                    {new Date(img.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YourImages;
