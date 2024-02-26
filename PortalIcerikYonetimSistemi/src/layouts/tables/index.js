import Card from "@mui/material/Card";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, InputGroupText, FormGroup, Label } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useEffect } from "react";
import projectsTableData from "layouts/tables/data/projectsTableData";


function Tables() {
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [modal, setModal] = useState(false); //! kategori modal
  const [editmodal, setEditModal] = useState(false); //! Edit için modal
  const [submodal, setSubModal] = useState(false); //! SubCategory için Modal.
  const [subEditModal, setSubEditModal] = useState(false) //! SubEdit için modal.

  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [id, setId] = useState();

  const [categorySub, setCategorySub] = useState([]);

  const [createCat, setCreateCat] = useState(""); //CREATE
  const [createDesc, setCreateDesc] = useState(""); // CREATE
  const [createCategoryId, setCreateCategoryId] = useState(0); //CREATE SUB
  const [editCat, setEditCat] = useState("");   //! Update 
  const [editDesc, setEditDesc] = useState("");  //! Update
  const [editCatId, setEditCatId] = useState(0); //! Update
  const [editid, seteditid] = useState(0);

  const toggle = () => setModal(!modal);
  const Subtoggle = () => setSubModal(!submodal);

  const editToggle = (item) => {
    setEditCat(item.Category);
    setEditDesc(item.description);
    seteditid(item.id);
    setEditModal(!editmodal);
  };

  const subEdit = (subitem) => {
    seteditid(subitem.id);
    setEditCat(subitem.Category);
    setEditDesc(subitem.description);
    setEditCatId(subitem.categoryId);
    setSubEditModal(!subEditModal);
  }
  
  const createCategory = async () =>{

    const data = {
      id: id,
      category: createCat,
      description: createDesc,
    };

    try
    {
    const result = await fetch("http://iysportal.tev.org.tr:8181/api/Category", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if(result.status == 200)
    {
      toast.success("Kategori Eklendi.", { position: toast.POSITION.BOTTOM_LEFT });
      setCreateCat(""); 
      setCreateDesc(""); 
      refreshList(); // Kategorileri yeniden alıyorum.
      toggle(); // Modal'ı kapatıp, yenileme yapıyorum. 
      alert("kategori kaydedildi.")
}} catch    (error){
  console.error(error);
  toast.error("Kaydedilemedi.", {position: toast.POSITION.BOTTOM_LEFT})
  }
}

const createSubCategory = async () => {
  const data = {
    category: createCat,
    description: createDesc,
    categoryId: id
  };

  console.log(id)
  try {
    const result = await fetch("http://iysportal.tev.org.tr:8181/api/CategorySubMenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      setCreateCat("");
      setCreateDesc("");
      setCreateCategoryId("");
      
      alert("kayıt edildi.");
      ListSubMenu();
      Subtoggle();
    }
  } catch (error) {
    console.error(error);
  }
};



const updateCategory = async () => {
  const data = {
    id: editid, 
    category: editCat,
    description: editDesc,
  };

  try {
    const response = await fetch(`http://iysportal.tev.org.tr:8181/api/Category/${editid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      toast.success("Kategori Güncellendi.", { position: toast.POSITION.BOTTOM_LEFT });
      // refreshList();
      console.log("Çalışıyor");
      console.log(editCat);
      console.log(editDesc);
      refreshList();
      setEditModal(editmodal);
      alert("Kategori Güncellendi.")
    } else {
      const errorData = await response.json();
      throw new Error(`Kategori Güncellenemedi: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error);
    toast.error("Kaydedilemedi.", { position: toast.POSITION.BOTTOM_LEFT });
  }
};

const deleteCategory = async(id) => {
  const isConfirmed = window.confirm("Bu kategoriyi silmek istediğinizden emin misiniz?");

  if (!isConfirmed) {
    return; 
  }

  const data = {
    id: id
  };
  const response = await fetch(`http://iysportal.tev.org.tr:8181/api/Category/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        
        alert('Kategori silindi.');
        console.log(id)
        refreshList();
      } else {
        
        alert('Veri silinemedi.');
        console.log(id)
      }
    })
    .catch((error) => {
      console.error('Hata oluştu:', error);
    });
};

const deleteCategorySub = async(id) => {
  const isConfirmed = window.confirm("Bu kategoriyi silmek istediğinizden emin misiniz?");

  if (!isConfirmed) {
    return; 
  }

  const data = {
    id: id
  };
  const response = await fetch(`http://iysportal.tev.org.tr:8181/api/CategorySubMenu/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        
        alert('Veri silindi.');
        console.log(id)
        refreshList();
        ListSubMenu();
      } else {
        
        alert('Veri silinemedi.');
        console.log(id)
      }
    })
    .catch((error) => {
      console.error('Hata oluştu:', error);
    });
};


const updateSubCategory = async () => {
  const data = {
    id: editid,
    category: editCat,
    description: editDesc,
    categoryId: editCatId
  };

  try {
    console.log("Sending PUT request with data:", data); // Debugging statement

    const response = await fetch(`http://iysportal.tev.org.tr:8181/api/CategorySubMenu/${editid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Received response status:", response.status); 

    if (response.status === 200) {
      console.log("Update successful"); 
      alert("Kategori Güncellendi.", { position: toast.POSITION.BOTTOM_LEFT });

      console.log("EditCat:", editCat); 
      console.log("EditDesc:", editDesc); 
      console.log("EditCatId:", editCatId); 
      console.log("id", editid)
      ListSubMenu();

      
      setSubEditModal(false); 
    } else {
      const errorData = await response.json();
      throw new Error(`Kategori Güncellenemedi: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error);
    toast.error("Kaydedilemedi.", { position: toast.POSITION.BOTTOM_LEFT });
  }
};

const refreshList = () => {
  fetch("http://iysportal.tev.org.tr:8181/api/Category", {
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
      setCategory(data);
      console.log(data); 
    })
    .catch(error => {
      console.error('Fetch error:', error.message); 
    
    });
}


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
      setCategorySub(data); // Update the state here
      console.log(data); 
    })
    .catch(error => {
      console.error('Fetch error:', error.message); 
    });
}



useEffect(() => {
  refreshList();
  ListSubMenu();
}, []);



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Başlıklar </ArgonTypography>
              <ArgonTypography variant="h6"><Button onClick={toggle} color="info"> Kategori Ekle</Button></ArgonTypography>
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
              
            
              <table className="table Borderless">
                    <thead>
                        <tr>
                          <th></th>
                        <th>
                          <span style={{ fontWeight: 'bold', color:'lightblue' , fontSize: '18px'}}>Numara</span>
                        </th>
                          <th>
                          <span style={{ fontWeight: 'bold', color:'lightblue',  fontSize: '18px'}}> Kategori</span>
                          </th>
                        <th>
                        <span style={{ fontWeight: 'bold', color:'lightblue', fontSize: '18px'}}> Açıklama</span>
                        </th>
                        <th>
                        <span style={{ fontWeight: 'bold', color:'lightblue', fontSize: '18px'}}> Seçenekler </span>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {category.map(item=> 
                            <tr className="table-light" key={item.id} > 
                            <td> </td>
                            <td style={{fontSize: '16px'}}> {item.id}</td>
                            <td style={{fontSize: '14px'}}> {item.Category}</td>
                            <td style={{fontSize: '14px'}}> {item.description}</td>
                            <td>
                            <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => editToggle(item)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg> 
                            </button>
                            
                            <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => deleteCategory(item.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>
                            </button>
                            </td>
                            </tr>
                            )}

                    </tbody>
                </table>

            </ArgonBox>
          </Card>
        </ArgonBox>


        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonTypography variant="h6"> Alt Başlıklar</ArgonTypography>
            <ArgonTypography variant="h6"><Button onClick={Subtoggle} color="info"> Alt Başlık Ekle</Button></ArgonTypography>
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
            <table className="table Borderless">
                    <thead>
                        <tr>
                          <th></th>
                        {/* <th>
                          <span style={{ fontWeight: 'bold', color:'lightblue' , fontSize: '18px'}}>Numara</span>
                        </th> */}
                          <th>
                          <span style={{ fontWeight: 'bold', color:'lightblue',  fontSize: '18px'}}> Alt Başlık</span>
                          </th>
                          {/* <th>
                        <span style={{ fontWeight: 'bold', color:'lightblue', fontSize: '18px'}}> Kategori Numarası</span>
                        </th> */}
                        <th>
                        <span style={{ fontWeight: 'bold', color:'lightblue', fontSize: '18px'}}> Açıklama</span>
                        </th>
                        <th>
                        <span style={{ fontWeight: 'bold', color:'lightblue', fontSize: '18px'}}> Seçenekler </span>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {categorySub.map(subitem => (
                    <tr className="table-light" key={subitem.id}>
                      <td> </td>
                      {/* <td style={{ fontSize: '16px' ,textAlign: 'left'}}>{subitem.id}</td> */}
                      <td style={{ fontSize: '14px',textAlign: 'left'}}>{subitem.Category}</td>
                      {/* <td style={{ fontSize: '14px',textAlign: 'center' }}>{subitem.categoryId}</td> */}
      <td style={{ fontSize: '14px',textAlign: 'left' }}>{subitem.description}</td>
      <td>
        
            <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => subEdit(subitem)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg> 
                            </button>
        

        <button type="button" className="btn btn-light mr-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => deleteCategorySub(subitem.id)}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>
                            </button>
      </td>
    </tr>
  ))}
</tbody>

                </table>
          </ArgonBox>
        </Card>


<Modal isOpen={modal} toggle={toggle}>

  <ModalHeader toggle={toggle}>Kategori Alanı</ModalHeader>
  <ModalBody>
    <div className="form-group">
      <InputGroup>
        <InputGroupText>
          Kategori
        </InputGroupText>
        <Input value={createCat} onChange={e => setCreateCat(e.target.value)} />
      </InputGroup>
      <div className="form-group">
        <div style={{ marginTop: '1cm' }}></div>
        <InputGroup>
          <InputGroupText>
            Açıklama
          </InputGroupText>
          <Input value={createDesc} onChange={e => setCreateDesc(e.target.value)}/>
        </InputGroup>
      </div>
    </div>
  </ModalBody>
  {/* ModalFooter */}
  <ModalFooter>
    <Button color="primary" onClick={createCategory}>
      Kaydet
    </Button>{' '}
    <Button color="secondary" onClick={toggle}>
      Vazgeç
    </Button>
  </ModalFooter>
</Modal>



<Modal isOpen={editmodal} toggle={editToggle}>
  <ModalHeader toggle={editToggle}>Kategori Alanı</ModalHeader>
  <ModalBody>
    <div className="form-group">
    <InputGroup>
      <InputGroupText>
        Numara
      </InputGroupText>
    <Input value={editid}/>
    </InputGroup>
    <div style={{ marginTop: '1cm' }}></div>
      <InputGroup>
      <InputGroupText>
        Kategori
      </InputGroupText>
      <Input value={editCat} onChange={e => setEditCat(e.target.value)}/>
    </InputGroup>
              <div className="form-group">
              <div style={{ marginTop: '1cm' }}></div>
            <InputGroup>
          <InputGroupText>
               Açıklama
          </InputGroupText>
          <Input value={editDesc} onChange={e=> setEditDesc(e.target.value)}/>
        </InputGroup>
    </div>
    </div>
  </ModalBody>

  <ModalFooter>
    <Button color="primary" onClick={updateCategory}>
      Güncelle
    </Button>{' '}
    <Button color="secondary" onClick={editToggle}>
      Vazgeç
    </Button>
  </ModalFooter>
</Modal>



<Modal isOpen={subEditModal} toggle={subEdit}>
  <ModalHeader toggle={subEdit}>Kategori Alanı</ModalHeader>
  <ModalBody>
    <div className="form-group">
    {/* <InputGroup>
      <InputGroupText>
        Kategori
      </InputGroupText>
      <Input value={editid} onChange={e => seteditid(e.target.value)} readOnly/>
    </InputGroup> */}
    {/* <div style={{ marginTop: '1cm' }}></div> */}
      <InputGroup>
      <InputGroupText>
        Kategori
      </InputGroupText>
      <Input value={editCat} onChange={e => setEditCat(e.target.value)}/>
    </InputGroup>
              <div className="form-group">
              <div style={{ marginTop: '1cm' }}></div>
              
        <InputGroup>
        <InputGroupText>
          Kategori Numarası
        </InputGroupText>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            value={id} 
            onChange={e => setId(e.target.value)} 
          >
            {category.map(item => (
              <option key={item.id} value={item.id}>
                {item.id} - {item.Category}
              </option>
            ))}
          </Input>
        </InputGroup>
        <div style={{ marginTop: '1cm' }}></div>
            <InputGroup>
          <InputGroupText>
               Açıklama
          </InputGroupText>
          <Input value={editDesc} onChange={e=> setEditDesc(e.target.value)}/>
        </InputGroup>
    </div>
    </div>
  </ModalBody>

  <ModalFooter>
    <Button color="primary" onClick={updateSubCategory}>
      Güncelle
    </Button>{' '}
    <Button color="secondary" onClick={subEdit}>
      Vazgeç
    </Button>
  </ModalFooter>
</Modal>


<Modal isOpen={submodal} toggle={Subtoggle} >
        <ModalHeader toggle={Subtoggle}>Alt Başlık Ekleme Ekranı</ModalHeader>
        <ModalBody>
    <div className="form-group">
                <InputGroup>
                <InputGroupText>
                  Alt Başlık
                </InputGroupText>
                <Input value={createCat} onChange={e => setCreateCat(e.target.value)} />
              </InputGroup>
              <div className="form-group">
              <div style={{ marginTop: '1cm' }}></div>
              <InputGroup>
  <InputGroupText>
    Kategori Numarası
  </InputGroupText>
  <Input
    id="exampleSelect"
    name="select"
    type="select"
    value={id} 
    onChange={e => setId(e.target.value)} 
  >
    {category.map(item => (
      <option key={item.id} value={item.id}>
        {item.id} - {item.Category}
      </option>
    ))}
  </Input>
</InputGroup>


              <div style={{ marginTop: '1cm' }}></div>
            <InputGroup>
          <InputGroupText>
               Açıklama
          </InputGroupText>
          <Input value={createDesc} onChange={e => setCreateDesc(e.target.value)}/>
        </InputGroup>
    </div>
    </div>
  </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={createSubCategory}>
            Kaydet
          </Button>{' '}
          <Button color="secondary" onClick={Subtoggle}>
            Vazgeç
          </Button>
        </ModalFooter>
      </Modal>

      </ArgonBox>
      <Footer />
    </DashboardLayout>
    
  );
}

export default Tables;
