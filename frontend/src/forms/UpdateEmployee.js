import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateEmployee = ({ closeModal, onEmployeeCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mob_no: '',
        designation: '',
        gender: '',
        courses: [],
        img: null
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        if (type === "checkbox") {
            setFormData(prev => ({
                ...prev,
                courses: checked ? [...prev.courses, value] : prev.courses.filter(c => c !== value)
            }));
        } else if (type === "file") {
            setFormData(prev => ({
                ...prev,
                img: files[0]
            }));
        } else if (type === "radio") {
            setFormData(prev => ({
                ...prev,
                gender: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === "courses") {
                formData[key].forEach(course => data.append(key, course));
            } else {
                data.append(key, formData[key]);
            }
        });
    
        try {
            const response = await axios.post('http://localhost:8000/UpdateEmployee', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                alert('Employee updated successfully!');
                onEmployeeCreated();
                closeModal();
                navigate('/employee_list');
            } else {
                throw new Error(`Server responded with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to update employee:', error);
            if (error.response) {
                
                alert(`Failed to update employee: ${error.response.data.message}`);
            } else {
                alert('Failed to update employee. Please check your inputs or network connection.');
            }
            closeModal(); 
        }
        
    };
    

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="modal-close" onClick={closeModal}>&times;</span>
                <form onSubmit={handleSubmit} className='create-employee-form'>
                    <div className='create-employee-form-elements'>
                        <label className='create-employee-form-label'>Name</label>
                        <input 
                            className='create-employee-form-input' 
                            type="text" 
                            name="name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='create-employee-form-elements'>
                        <label className='create-employee-form-label'>Email</label>
                        <input 
                            className='create-employee-form-input' 
                            type="text" 
                            name="email"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='create-employee-form-elements'>
                        <label className='create-employee-form-label'>Mobile No</label>
                        <input 
                            className='create-employee-form-input' 
                            type="text" 
                            name="mob_no"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='create-employee-form-elements'>
                        <label className='create-employee-form-label'>Designation</label>
                        <select 
                            className='create-employee-form-select' 
                            name="designation" 
                            onChange={handleInputChange}
                        >
                            <option value="default">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <div className='create-employee-form-elements'>
                        <label className='create-employee-form-label'>Gender</label>
                        <div className='flex'>
                            <input 
                                className='create-employee-form-radio' 
                                type="radio" 
                                name="gender"
                                value="Male"
                                onChange={handleInputChange} 
                            /> <label>Male</label>
                            <input 
                                className='create-employee-form-radio' 
                                type="radio" 
                                name="gender"
                                value="Female"
                                onChange={handleInputChange} 
                            /> <label>Female</label>
                        </div>
                    </div>
                    <div className='create-employee-form-elements'>
                        <label className='create-employee-form-label'>Courses</label>
                        <div className='flex'>
                            <input 
                                className='create-employee-form-checkbox' 
                                type="checkbox" 
                                name="courses"
                                value="MCA"
                                onChange={handleInputChange} 
                            /><label>MCA</label>
                            <input 
                                className='create-employee-form-checkbox' 
                                type="checkbox" 
                                name="courses"
                                value="BCA"
                                onChange={handleInputChange} 
                            /><label>BCA</label>
                            <input 
                                className='create-employee-form-checkbox' 
                                type="checkbox" 
                                name="courses"
                                value="BSC"
                                onChange={handleInputChange} 
                            /><label>BSC</label>
                        </div>
                    </div>
                    <div className='create-employee-form-elements'>
                        <label className='create-employee-form-label'>Image Upload</label>
                        <input
                            className="create-employee-form-upload-file"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            name="img"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='create-employee-form-btn'>
                        <input 
                            className='create-employee-form-input-btn' 
                            type="submit" 
                            value="Update" 
                        />
                        <button 
                            type="button" 
                            onClick={closeModal}
                            className='create-employee-form-cancel-btn' 
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateEmployee;
