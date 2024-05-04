import { Typography } from "@mui/material"

const Dashboard = () => {
  return (
    <section>
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
        Pagina Principal
      </Typography>
    </section>
  )
}

export default Dashboard