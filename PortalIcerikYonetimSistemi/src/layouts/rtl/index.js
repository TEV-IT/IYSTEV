
import Card from "@mui/material/Card";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import mevzuatTables from "layouts/tables/data/mevzuatTables";
import Modal from '@mui/material/Modal';
import { toast, ToastContainer } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'background.paper',  //bgcolor
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4, 
};


function MevzuatTables() {
  const { columns, rows } = mevzuatTables;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false); 

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file...");
  
      const formData = new FormData();
      formData.append("file", file);
      
  
      try {
        const result = await fetch("http://localhost:22665/api/MediaFiles/SaveFile", {
          method: "POST",
          body: formData,
        });
  
        const data = await result.json();
  
        console.log(data);
        toast.success("Kaydedildi.", {position: toast.POSITION.BOTTOM_CENTER})
      } catch (error) {
        console.error(error);
        toast.error("Kaydedilemedi.", {position: toast.POSITION.BOTTOM_CENTER})
      }
      finally {
        setUploading(false);
        setFile(null); 
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Mevzuat Düzenle</ArgonTypography>
              <ArgonTypography variant="h6"><Button onClick={handleOpen}> Mevzuat Ekle</Button></ArgonTypography>
            </ArgonBox>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
           <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <>
      <div>
        <label htmlFor="file" className="sr-only">
          Dosya seç
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
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

      {file &&  <ArgonTypography> <button color="info" onClick={handleUpload}>Dosyayı Yükle</button></ArgonTypography>}
      {uploading && <p>Uploading...</p>}
      {/* \\tevsrvweb\IYS_Media */}
    </>

        </Box>
      </Modal>
              <Table columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MevzuatTables;
