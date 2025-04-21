import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import kartService from "../services/kart.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const Karts = () => {
  const [karts, setKarts] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    kartService
      .getAll()
      .then((response) => {
        console.log("Mostrando lista de todos los karts", response.data);
        setKarts(response.data);
      })
      .catch((error) => {
        console.error("Error al intentar mostrar la lista de todos los karts:", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Id: ", id);
    const confirmDelete = window.confirm("Esta seguro que desea borrar este Kart?");
    if (confirmDelete){
        kartService
            .remove(id)
            .then((response) => {
                console.log("Kart ha sido eliminado", response.data);
                init();
            })
            .catch((error) => {
                console.log("Se ha producido un error al eliminar el Kart", error);
            });
    }
  };

  {/* 
    const handleEdit = (id) => {
        console.log("Imprimiendo id: ", id);
        navigate(`/kart/edit/${id}`);
        };
    
    */}

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Karts List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="karts table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Model
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {karts.map((kart) => (
              <TableRow
                key={kart.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{kart.model}</TableCell>
                <TableCell align="left">{kart.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Karts;
