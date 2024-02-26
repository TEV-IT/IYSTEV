/* eslint-disable react/prop-types */
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";
import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";

function Author({ image, name }) {
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

const authorsTableData = {
  columns: [
    { name: "Kategoriler", align: "left" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center"},
  ],

  rows: [
    {
      
      Kategoriler: <Author  name="TEV Hakkında"  />,
      edit: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"   
        >
          <Button color="danger" outline> Düzenle </Button> {' '}
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
        <Button color="danger" outline> Sil </Button> {' '}
      </ArgonTypography>
      ),
    },
    

  ],
};

export default authorsTableData;
