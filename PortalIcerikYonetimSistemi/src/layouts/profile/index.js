import React from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import "primereact/resources/themes/lara-light-indigo/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css
import "primeicons/primeicons.css" //icons
import { Editor } from "primereact/editor";
import { useState } from "react";
import { InputGroup, InputGroupText, FormControl, Button, Form, Row, Col} from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import { useEffect } from "react";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import Modal from '@mui/material/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "layouts/profile/components/Header";
import bgImage from "assets/images/tev.png";
import { Category } from "@mui/icons-material";
import { item } from "examples/Sidenav/styles/sidenavItem";


function Overview() {
  const [value, setValue]= useState("");
  const [htmlValue, setHtmlValue] = useState("");
  const [caption, setCaption] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [id, setId]= useState(0);
  const [description, setDescription] = useState("");

  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false); 

  const convertToHtml = async () => {
    console.log(id);
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/html');
    const paragraphs = doc.querySelectorAll('p');

    paragraphs.forEach((p) => {
        const textAlignClass = Array.from(p.classList).find((cls) => cls.startsWith('ql-align-'));
        if (textAlignClass) {
            const textAlign = textAlignClass.replace('ql-align-', '');
            p.style.textAlign = textAlign;
        }
        const strongElements = p.querySelectorAll('strong');
        strongElements.forEach((strong) => {
            strong.style.fontWeight = 'bold';
        });
    });

    const html = doc.documentElement.innerHTML;
    setHtmlValue(html);
    console.log(html);

    const data = {
        caption: caption,
        body: html,
        categoryId: id
    };

    if (!caption && !html) {
      alert("Ana Başlık ve İçerik boş geçilemez, kontrol edin.");
      return;
  }

    try {
        const result = await fetch("http://iysportal.tev.org.tr:8181/api/Content", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (result.status === 200) {
            setCaption("");
            setHtmlValue("");
            alert("İçerik eklendi, Portal tarafından kontrol edebilirsiniz.")
        }
    } catch (error) {
        console.error(error);
    }
}


const handleFileChange = (e) => {
  if (e.target.files) {
    setFile(e.target.files[0]);
    
  }
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: 'background.paper', // Use backgroundColor instead of bgcolor
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4, // Use padding instead of p
};


const handleUpload = async (id) => {
  if (file) {
    console.log("Uploading file...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("FileType", file.type);
    formData.append("contentId", id)

    try {
      const result = await fetch("http://iysportal.tev.org.tr:8181/api/MediaFiles/SaveFile", {
        method: "POST",
        body: formData,
      });

      const data = await result.json();

      console.log(data);
      toast.success("Kaydedildi.", {position: toast.POSITION.BOTTOM_CENTER})
      alert("Ekteki belge Portala eklenmiştir. Kontrol sağlayabilirsiniz.")
    } catch (error) {
      console.error(error);
      toast.error("Kaydedilemedi.", {position: toast.POSITION.BOTTOM_CENTER})
    }
    finally {
      setUploading(false);
      setFile(null);
      setDescription(""); 
      handleClose();
    }
  }
};
const ListSubMenu = () => {
  fetch("http://iysportal.tev.org.tr:8181/api/CategorySubMenu", {
    method: 'GET',
    redirect: 'follow'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setSubCategory(data); // Update the state here
      console.log(data); 
    })
    .catch(error => {
      console.error('Fetch error:', error.message); 
    });
}

  useEffect(() => {
    ListSubMenu();
  }, []);
  



  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
        
  <Card>
  <ArgonBox pt={2} px={2}>
    <ArgonBox mb={0.5} style={{ textAlign: "center" }}>
      <ArgonTypography variant="h6" fontWeight="medium">
       <h1>Portal Editör</h1> 
      </ArgonTypography>
    </ArgonBox>
    <ArgonBox mb={2} style={{ textAlign: "center" }}>
      <ArgonTypography variant="button" fontWeight="regular" color="text">
        Lütfen hangi alana eklemek istediğinizi seçiniz.
      </ArgonTypography>
    </ArgonBox>
    <ArgonBox mb={2} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Col md={4}>
    <Form>
      <Form.Group controlId="exampleSelect">
        <Row>
          <Col sm="6">
            <Form.Label>Alt Başlıklar</Form.Label>
          </Col>
          <Col sm="6">
            <FormControl as="select" value={id} style={{width:"180px"}} onChange={e => setId(e.target.value)}>
              {Array.isArray(SubCategory) && SubCategory.map(item => (
                <option key={item.id} value={item.id}>
                  {item.id} - {item.Category}
                </option>
              ))}
            </FormControl>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  </Col>
         <Col md={4}>
            <Button
            color="info"
            onClick={() => convertToHtml(item.id)}
            style={{ marginRight: "100px" }}
          >
      Kaydet
    </Button>
                </Col>
  <Col md={2}>
    <Button color="info" onClick={() => handleOpen(item.id)} style={{ marginLeft: '20px' }}>Mevzuat Ekle</Button>
  </Col>
</ArgonBox>



<Grid container spacing={1}>
    <div style={{ width: "100%" }}>
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Ana Başlık"
        style={{
          width: "70%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  


     <Editor
      value={value}
      onTextChange={(e) => setValue(e.htmlValue)}
      style={{ height: "500px", width: "100%" }}
    /> 
</Grid>

        </ArgonBox>
        </Card>


        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <>
      <div>
      <ArgonBox mb={2} style={{ display: 'flex'}}>

            <Form>
            <Form.Group controlId="exampleSelect">
              <Row>
                <Col sm="6">
                  <Form.Label>Mevzuat Alanı </Form.Label>
                </Col>
                <Col sm="6">
                  <FormControl as="select" value={id} onChange={e => setId(e.target.value)}>
                    {Array.isArray(SubCategory) && SubCategory.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.id} - {item.Category}
                      </option>
                    ))}
                  </FormControl>
                </Col>
              </Row>
            </Form.Group>
            </Form>
            </ArgonBox>

        <label htmlFor="file" className="sr-only">
          Dosya seç : 
        </label>
        <input id="file" type="file" onChange={handleFileChange} style={{ marginLeft: '10px' }}/>
        <div> 
          <label htmlFor="file" className="sr-only" style={{ marginTop: '20px' }}>
          Açıklama:
        </label>
        <input type="text" style={{ marginLeft: '15px' }} value={description} onChange={e => setDescription(e.target.value)}/>

        </div>
       
      </div>
      {file && (
        <section>
         <b> Dosya Detayları </b> 
          <ul>
            <li> Dosya Adı: {file.name}</li>
            <li>Tip: {file.type}</li>
            <li>Dosya Boyutu: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file &&  <ArgonTypography> <Button color="info" onClick={() => handleUpload(id)}>Dosyayı Yükle</Button></ArgonTypography>}
      {uploading && <p>Uploading...</p>}
    </>

        </Box>
      </Modal>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
