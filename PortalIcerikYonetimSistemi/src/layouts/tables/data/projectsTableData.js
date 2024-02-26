/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonProgress from "components/ArgonProgress";
import ArgonAvatar from "components/ArgonAvatar";
import { FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import {variables} from "./variables";
import React, { useState, useEffect } from 'react';
function Completion({  image, name }) {

const [Category, setCategory] = useState("");
const [description, setDescription] = useState("");


const refreshList = () => {
  fetch("http://localhost:22665/api/Category", {
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
      console.log(data); 
    })
    .catch(error => {
      console.error('Fetch error:', error.message); 
    });
}

useEffect(() => {
  refreshList();
}, []);

  const action = (
    <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
      more_vert
    </Icon>
  );
  
  return (
    <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
      <ArgonBox mr={2}>
        <ArgonAvatar src={image} alt={name} size="sm" variant="rounded" />
      </ArgonBox>
      <ArgonBox display="flex" flexDirection="column">
        <ArgonTypography variant="button" fontWeight="medium">
          {name}
        </ArgonTypography>
      </ArgonBox>
    </ArgonBox>
  );
}

const projectsTableData = {
  columns: [
    { name: "Baslıklar", align: "left" },
    { name: "kategori", align: "left" },
    { name: "edit", align: "center" },
    {name: "delete", align: "center"},
  ],

  rows: [
    {
      Baslıklar: <Completion name={"TEV Hakkında"}/>,
      kategori: (
        <ArgonTypography variant="button" color="text" fontWeight="medium">
         <ArgonTypography variant="button" color="text" fontWeight="medium">
         <select id="kategori">
          <option value="armut" disabled>TEV hakkında</option>
          <option value="üzüm" >İnsan Kaynakları</option>
          <option value="elma" >Mevzuatlar</option>
          <option value="üzüm" >Kişisel</option>
    </select>    
        </ArgonTypography>
        </ArgonTypography>
      ),
      edit: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption" 
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </ArgonTypography>
      ),
      delete: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption" 
          color="secondary"
          fontWeight="medium"
        >
          Sil
        </ArgonTypography>
      ),
    },
    {
      Baslıklar: <Completion name={"Personel Yönetmeliği"}/>,
      kategori: (
        <ArgonTypography variant="button" color="text" fontWeight="medium">
         <ArgonTypography variant="button" color="text" fontWeight="medium">
         <select id="kategori">
          <option value="armut">TEV hakkında</option>
          <option value="üzüm">İnsan Kaynakları</option>
          <option value="elma">Mevzuatlar</option>
          <option value="üzüm">Kişisel</option>
    </select>    
        </ArgonTypography>
        </ArgonTypography>
      ),
      edit: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption" 
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </ArgonTypography>
      ),
      delete: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption" 
          color="secondary"
          fontWeight="medium"
        >
          Sil
        </ArgonTypography>
      ),

    },
  ],
};

export default projectsTableData;
