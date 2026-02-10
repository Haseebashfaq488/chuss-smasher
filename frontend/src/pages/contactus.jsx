import React, { useState } from "react";
import {
    Container,
    Box,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
} from "@mui/material";
const Contactus = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        description: "",
        gender: "",
        agree: false,
    });



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert(JSON.stringify(formData, null, 2)); // Pretty prints the object
};


    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 5,
                    p: 3,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                }}
            >
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
                <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        row
                    >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                        />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                        />
                    }
                    label="I agree to terms"
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
        </Container>
    );
}


export default Contactus;
