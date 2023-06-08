import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { httpNoAuth } from "../helper/httpCommon";
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FilesService from "../api/fileService";
import Editor from "ckeditor5-custom-build"
import PostsService from "../api/PostsService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function WritePost() {
    const navigate = useNavigate();
    let location = useLocation();
    const { id } = useParams();
    console.log(id);

    const initialState = {
        id: 0,
        title: "",
        content: "",
        topic: 0,
        tags: ""
    };

    const [newBlog, setBlog] = useState(initialState);
    const [topics, setTopics] = useState([{id:0, name:""}]);
    const [errors, setErrors] = useState(initialState);
    const [myeditor, setEditor] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [apiError, setAPIError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getPostToEdit = () => {
            if (id === "0") return;
            PostsService.getOne(id).then(response => {
                console.log(response);
                const data = {
                    id: response.data.id,
                    title: response.data.title,
                    content: response.data.content,
                    topic: response.data.topic.id,
                    tags: response.data.tags
                }
             
                 setBlog({...data});
                
            }).catch((error) => {
                setAPIError(error.message ? error.message : "Something went wrong!")
                setIsLoading(false)
            })
        }
        // Update the document title using the browser API
        if (id === "0") {
            setIsEdit(false);
            // setBlog({...initialState});
            resetForm()
            document.title = "Create new post"
        } else {
            document.title = "Edit post"
            setIsEdit(true);
            getPostToEdit();
        }
        getTopic();
    }, [location, isEdit]);



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBlog(newBlog); //
        setBlog({ ...newBlog, [name]: value });
    };
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setBlog({ ...newBlog, "content": data });
    }
    const handleSubmit = () => {
        console.log("[new post] ",newBlog);
        return isEdit
            ? handleUpdate(newBlog)
            : handleCreate(newBlog);
    }

    const handleUpdate = (data) => {
        PostsService.update(newBlog.id, data)
            .then((response) => {
                // resetForm()
                navigate(`/read/${newBlog.id}`);
            })
            .catch((err) => {
                setErrors(err.response.data)
            });
    };

    const handleCreate = (data) => {
        PostsService.create(data)
            .then((response) => {
                resetForm()
                console.log(response);
                console.log(response.data.id);
                navigate(`/read/${response.data.id}`);

            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data)
            });
    };
    const resetForm = () => {
        // myeditor.setData('');
        console.log("reset form");
        setBlog({...initialState});
        setErrors(initialState)
    };

    const getTopic = () => {
        console.log("Get topic");
        httpNoAuth.get('/topics/')
            .then(function (response) {
                // handle success
                console.log(response);
                setTopics(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }
    function uploadAdapter(loader) {
        console.log(loader);

        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    loader.file.then((file) => {
                        console.log("file>>>", file);
                        let formData = new FormData();
                        formData.append("url", file);
                        formData.append("name", 72);
                        formData.append("url1", "test body");
                        console.log("body>>>", formData);
                        for (var key of formData.entries()) {
                            console.log(key[0] + ', ' + key[1]);
                        }
                        FilesService.upload(formData).then((response) => {
                            console.log(response);
                            resolve({
                                default: `${process.env.REACT_APP_API}/${response.data.url}`
                            });
                        })
                            .catch((err) => {
                                reject(err);
                                console.log(err);
                            });
                    });
                });
            }
        };
    }
    return (
        <div className="container">
            <h1>Write blog</h1>
            <TextField
                autoFocus
                margin="dense"
                label="Post Title"
                required
                value={newBlog.title}
                name="title"
                onChange={handleInputChange}
                type="text"
                fullWidth
                variant="standard"
                error={!!errors.title}
                helperText={errors.title && errors.title[0]}
            />
            <CKEditor
                config={{
                    extraPlugins: [uploadPlugin]
                   }}
                editor={Editor}
                data={newBlog.content || ''}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={handleEditorChange}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            <TextField
                autoFocus
                margin="dense"
                label="Tags"
                required
                value={newBlog.tags}
                name="tags"
                onChange={handleInputChange}
                type="text"
                fullWidth
                variant="standard"
                error={!!errors.tags}
                helperText={errors.tags && errors.tags[0]}
            />
            <br />

            <InputLabel id="demo-simple-select-label">Topic</InputLabel>
            <Select
                autoFocus
                margin="dense"
                label="Topics"
                required
                value={newBlog.topic}
                name="topic"
                onChange={handleInputChange}
                type="text"
                fullWidth
                variant="standard"
                error={!!errors.topic}
            >
                {topics.map(item => (
                    <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                ))}
                 {/* // DEFAULT */}
                <MenuItem disabled={true} value="0">Please select</MenuItem>
            </Select>

            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
    );
}