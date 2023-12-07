import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h4" align="center" sx={{ margin: "20px 0", marginTop: "50px" }}>
          Admin Dashboard
        </Typography>
      </Container>

      <div className="admin-card-container">
        <CardContainer
          to="/admin/manageUsers"
          title="Manage Users"
          titleStyle={{ fontSize: "24px", fontWeight: "bold", color: "#4CAF50" }}
          description="Manage users in the system"
          descriptionStyle={{ fontSize: "16px", color: "#555" }}
        >
          <ImgMediaCard />
        </CardContainer>

        <CardContainer
          to="/admin/manageInstructor"
          title="Manage Instructors"
          titleStyle={{ fontSize: "24px", fontWeight: "bold", color: "#2196F3" }}
          description="Manage instructors in the system"
          descriptionStyle={{ fontSize: "16px", color: "#555" }}
        >
          <ImgMediaCard />
        </CardContainer>

        <CardContainer
          to="/admin/courses"
          title="Manage Courses"
          titleStyle={{ fontSize: "24px", fontWeight: "bold", color: "#FF5722" }}
          description="Manage courses in the system"
          descriptionStyle={{ fontSize: "16px", color: "#555" }}
        >
          <ImgMediaCard />
        </CardContainer>
      </div>
    </div>
  );
};

const CardContainer = ({ to, title, titleStyle, description, descriptionStyle, children }) => {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card-container" style={{ marginBottom: "20px", padding: "20px" }}>
        <Typography gutterBottom variant="h4" component="div" style={titleStyle}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={descriptionStyle}>
          {description}
        </Typography>
        {children}
      </div>
    </Link>
  );
};

const ImgMediaCard = () => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: "10px", overflow: "hidden" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        // Use the correct relative path from the public URL
        image={process.env.PUBLIC_URL + "/user-manage.jpg"}
      />
      <CardContent>
        {/* Text specific to each card */}
        {/* You can customize this text based on the specific content you want for each card */}
      </CardContent>
    </Card>
  );
};

export default AdminPage;
