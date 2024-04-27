import React, { useState } from 'react';
import axios from 'axios';

const HOST = "http://ec2-15-165-137-59.ap-northeast-2.compute.amazonaws.com";
export default function ImageUpload() {
    const [zzImage, setZzImage] = useState(null);
    const handleImageChange = (e: any) => {
        setZzImage(e.target.files[0]);
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        if (zzImage) {
            formData.append('image', zzImage);
        }
        try {
            const response = await axios.post(HOST + '/api/members/profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzE0MDcwNTM4fQ.XOlZquhSjsxyNMwot5GfQWrF5yxHPdtJOsnJGQG3Cek'
                },
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
    <button type="submit">Upload</button>
        </form>
);
}