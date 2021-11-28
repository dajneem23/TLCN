import { Button, Container, Typography } from "@mui/material";
import React from "react";
import jsPDF from 'jspdf'
import ImageUploading from 'react-images-uploading';
import './style.css';
import { useState } from "react";

export default function CreateCV() {

    const [images, setImages] = useState([]);
    const maxNumber = 69;
    const [numEducation, setNumEdication] = useState([1]);
    const [numSkill, setNumSkill] = useState([1]);
    const [numProject, setNumProject] = useState([1]);

    const onChangeImage = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const pdfGenerate = () => {
        console.log("sss");
        var doc = new jsPDF('p', 'pt', 'a3');

        doc.html(document.querySelector("#cv"), {
            callback: function (pdf) {
                pdf.save(`${new Date().getTime()}.pdf`);
            }
        })
    }

    const addSkill = () => {
        numSkill.push(1);
        setNumSkill([...numSkill]);
    }

    const addEducation = () => {
        numEducation.push(1);
        setNumEdication([...numEducation]);
    }

    const addProject = () => {
        numProject.push(1);
        setNumProject([...numProject])
    }

    const removeSkill = () => {
        if (numSkill.length > 1) {
            numSkill.pop();
            setNumSkill([...numSkill]);
        }
    }

    const removeEducation = () => {
        if (numEducation.length > 1) {
            numEducation.pop();
            setNumEdication([...numEducation]);
        }
    }

    const removeProject = () => {
        if (numProject.length > 1) {
            numProject.pop();
            setNumProject([...numProject])
        }
    }

    return (
        <div className="page_container" >
            <Container maxWidth="lg" className="container" >
                <div className="title_page">Create your CV</div>
                <div className="cv_container">
                    <div id="cv" className='cv_export'>
                        <div className="cv_info_container">
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChangeImage}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemoveAll,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    // write your building UI
                                    <div className="upload__image-wrapper">
                                        {imageList.length == 0 && <button
                                            style={isDragging ? { color: 'red' } : undefined}
                                            onClick={onImageUpload}
                                            {...dragProps}>
                                            Upload Image
                                        </button>}
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item img_container">
                                                <img src={image['data_url']} alt="" className="cv_img" />
                                                <Button className='btn_update_img' onClick={() => onImageUpdate(index)}>Update</Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
                            <div className='cv_info_child_container'>
                                <input type='text' className='cv_info_name' placeholder='Your Name' />
                                <input type='text' className='cv_info_major' placeholder='Android Developer' />
                                <div className='div_row'>
                                    <div className='cv_info_details_title'>
                                        <text>Date of birth:</text>
                                        <text>Gender:</text>
                                        <text>Phone:</text>
                                        <text>Email:</text>
                                        <text>Address:</text>
                                    </div>
                                    <div className='cv_info_details_des' >
                                        <input type='text' className='cv_input_normal' placeholder='Ex: 10 Sep 1990' />
                                        <input type='text' className='cv_input_normal' placeholder='Male or Female' />
                                        <input type='text' className='cv_input_normal' placeholder='Your phone number' />
                                        <input type='text' className='cv_input_normal' placeholder='Your email' />
                                        <input type='text' className='cv_input_normal' placeholder='Your address' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='cv_objective_container'>
                            <text> OBJECTIVE</text>
                            <hr className='cv_divider_line' />
                            <textarea className='cv_input_normal' placeholder='Enter your description'></textarea>
                        </div>
                        <div className='cv_objective_container'>
                            <text className="objective_title"> EDUCATION
                                <Button className='btn_add' onClick={addEducation}>Add</Button>
                                <Button className='btn_add' onClick={removeEducation} variant="outlined" color="error">Delete</Button>
                            </text>
                            <hr className='cv_divider_line' />
                            {numEducation.map(() =>
                                <div>
                                    <div className='div_row' style={{ marginTop: 5 }}>
                                        <div className='cv_info_details_title'>
                                            <input type='text' className='cv_input_bold' placeholder='Sep 2018 - Present' />
                                        </div>
                                        <div className='cv_info_details_des' >
                                            <input type='text' className='cv_input_bold' placeholder='HCM University of Technology and Education' />
                                            <input type='text' className='cv_input_normal' placeholder='Infomation Technology' />
                                            <input type='text' className='cv_input_normal' placeholder='GPA: 3.0/4' />
                                        </div>
                                    </div>
                                    <hr className="cv_sub_divider_line" />
                                </div>
                            )}
                        </div>
                        <div className='cv_objective_container'>
                            <text className="objective_title"> SKILLS
                                <Button className='btn_add' onClick={addSkill}>Add</Button>
                                <Button className='btn_add' onClick={removeSkill} variant="outlined" color="error">Delete</Button>
                            </text>
                            <hr className='cv_divider_line' />
                            {numSkill.map(() => {
                                console.log("hello")
                                return (
                                    <div>
                                        <div className='div_row' style={{ marginTop: 5 }}>
                                            <div className='cv_info_details_title'>
                                                <input type='text' className='cv_input_bold' placeholder='Teamwork' />
                                            </div>
                                            <div className='cv_info_details_des' >
                                                <textarea className='cv_input_normal' placeholder='Enter skill description' />
                                            </div>
                                        </div>
                                        <hr className="cv_sub_divider_line" />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='cv_objective_container'>
                            <text> INTERESTS</text>
                            <hr className='cv_divider_line' />
                            <textarea className='cv_input_normal' placeholder='Enter your description'></textarea>
                        </div>
                        <div className='cv_objective_container'>
                            <text className="objective_title"> PROJECTS
                                <Button className='btn_add' onClick={addProject}>Add</Button>
                                <Button className='btn_add' onClick={removeProject} variant="outlined" color="error">Delete</Button>
                            </text>
                            <hr className='cv_divider_line' />
                            {numProject.map(() =>
                                <div className='div_column'>
                                    <input type='text' className='cv_input_project' placeholder='Project name' />
                                    <table>
                                        <tr>
                                            <th>Customer</th>
                                            <td>
                                                <input className="cv_input_normal_noline" type='text' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>
                                                <textarea className="cv_input_normal_noline" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Team size</th>
                                            <td>
                                                <input className="cv_input_normal_noline" type='text' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>My position</th>
                                            <td>
                                                <input className="cv_input_normal_noline" type='text' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Responsibilities</th>
                                            <td>
                                                <input className="cv_input_normal_noline" type='text' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Technologies used</th>
                                            <td>
                                                <input className="cv_input_normal_noline" type='text' />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
            <Container maxWidth='lg'>
                <div className="editor_header_container">
                    <Button variant="contained" color="success" onClick={() => {
                        pdfGenerate()
                    }}>
                        Submit
                    </Button>
                </div>
            </Container>
        </div>
    )
}