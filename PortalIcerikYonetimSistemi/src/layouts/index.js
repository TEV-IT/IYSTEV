import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import ArgonBox from "components/ArgonBox";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import BgImage from "assets/images/signin.png";
import { useNavigate } from 'react-router-dom';

function Cover() {
  const [Username, setusername] = useState("");
  const [Password, setpassword] = useState("");

  const navigate = useNavigate(); 

  const login = async () => {
    const modifiedUsername = `@${Username}`;
    const data = {
      Username: Username,
      Password: Password,
    };

    try {
      const result = await fetch("http://iysportal.tev.org.tr:8181/api/Auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (result.status === 200) {
        navigate('/dashboard');
        console.log("çalıştı.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    login();
  }

  return (
    <CoverLayout
      title="Hoşgeldiniz!"
      description=" İçerik Yönetim Sistemine hoşgeldiniz. "
      image={BgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form" onSubmit={handleSubmit}>
            <ArgonBox mb={2}>
              <ArgonInput
                type="email"
                placeholder="username"
                value={Username}
                onChange={(e) => setusername(e.target.value)}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="password"
                placeholder="Password"
                value={Password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center"></ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton variant="gradient" color="dark" fullWidth type="submit">
                Giriş Yap
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
