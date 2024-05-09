import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEmployee from '../forms/CreateEmployee';
import UpdateEmployee from '../forms/UpdateEmployee';
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import Search from '../components/Search';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8000/employee');
            console.log("Received data:", response.data); 
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleEmployeeCreated = () => {
        fetchEmployees();
        setModalIsOpen(false);
    };

    const handleEdit = (employee) => {
        setCurrentEmployee(employee);
        setEditModalOpen(true);
    };

    const handleDelete = async (email) => {
        try {
            await axios.delete(`http://localhost:8000/employee/${email}`);
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const filteredEmployees = employees.filter(employee => {
        const idString = employee.id ? employee.id.toString() : '';
        const nameString = employee.name ? employee.name.toLowerCase() : '';
        const emailString = employee.email ? employee.email.toLowerCase() : '';
        const createdDateString = employee.created_date ? employee.created_date : '';

        return (
            nameString.includes(searchTerm.toLowerCase()) ||
            emailString.includes(searchTerm.toLowerCase()) ||
            idString.includes(searchTerm) ||
            createdDateString.includes(searchTerm)
        );
    });

    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">
                <FaPlus />
            </button>
            {modalIsOpen && <CreateEmployee closeModal={() => setModalIsOpen(false)} onEmployeeCreated={handleEmployeeCreated} />}
            {editModalOpen && <UpdateEmployee employee={currentEmployee} closeModal={() => setEditModalOpen(false)} />}
            <div className='relative py-4 ml-[84%]'>
                <Search onSearchTermChange={updateSearchTerm} />
            </div>

            <table className="min-w-full table-auto">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Mobile No</th>
                        <th className="px-4 py-2">Designation</th>
                        <th className="px-4 py-2">Gender</th>
                        <th className="px-4 py-2">Courses</th>
                        <th className="px-4 py-2">Create Date</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                {filteredEmployees.map((employee, index) => (
                    <tr key={employee.id}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{employee.name}</td>
                        <td className="border px-4 py-2">{employee.email}</td>
                        <td className="border px-4 py-2">{employee.mob_no}</td> 
                        <td className="border px-4 py-2">{employee.designation}</td>
                        <td className="border px-4 py-2">{employee.gender}</td>
                        <td className="border px-4 py-2">{employee.courses.join(", ")}</td> 
                        <td className="border px-4 py-2">{employee.created_date}</td>
                        <td className="border px-4 py-2 flex justify-around">
                            <button onClick={() => handleEdit(employee)} className="text-green-500 hover:text-green-700">
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(employee.email)} className="text-red-500 hover:text-red-700">
                                <FaTrashAlt />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
