"use client";
import { Center } from "@chakra-ui/react";
import { Container, Grid, Typography } from "@mui/material";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const Profile = () => {
  return (
    <Container>
      <Typography
        variant="h4"
        color={"white"}
        sx={{
          textTransform: "uppercase",
          marginTop: "1%",
          borderBottom: "2px solid white",
          padding: "4px",
        }}
        textAlign={"center"}
      >
        Editar Perfil
      </Typography>
      <Grid container spacing={2} p={2} mt={4}>
        <form className="flex flex-col gap-4 form-grid">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Editar</Button>
        </form>
      </Grid>
    </Container>
  );
};

export default Profile;
