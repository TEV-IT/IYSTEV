/* eslint-disable react/prop-types */
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";
import MevzuatTables from "layouts/rtl";

function Mevzuat({ image, name }) {
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

const mevzuatTables = {
  columns: [
    { name: "Mevzuatlar", align: "left" },
    { name: "edit", align: "center" },
    { name: "delete", align: "center"},
  ],

  rows: [
    {
        Mevzuatlar: <Mevzuat  name="Personel Yonetmeligi"  />,
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
        Mevzuatlar: <Mevzuat  name="xxx Yönetmeliği" />,
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
        Mevzuatlar: <Mevzuat name="KVK Yönetmeliği" />,
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

export default mevzuatTables;
