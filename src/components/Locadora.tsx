import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TextField, Button } from "@mui/material";
import { PlusCircle } from "lucide-react";
import "./styles.css";

interface Carro {
  id: number;
  marca: string;
  modelo: string;
  ano: string;
  capacidade: string;
  potencia: string;
}

const Locadora = () => {
  const [carros, setCarros] = useState<Carro[]>(JSON.parse(localStorage.getItem('carros') || ""));
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [potencia, setPotencia] = useState("");

  useEffect(() => {
    const carrosSalvos = localStorage.getItem("carros");
    if (carrosSalvos) {
      setCarros(JSON.parse(carrosSalvos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carros", JSON.stringify(carros));
  }, [carros]);


  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const novoCarro: Carro = {
      id: carros.length + 1,
      marca,
      modelo,
      ano,
      capacidade,
      potencia,
    };
    setCarros([...carros, novoCarro]);
    setMarca("");
    setModelo("");
    setAno("");
    setCapacidade("");
    setPotencia("");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "marca", headerName: "Marca", width: 150 },
    { field: "modelo", headerName: "Modelo", width: 150 },
    { field: "ano", headerName: "Ano", width: 150 },
    { field: "capacidade", headerName: "Capacidade", width: 150 },
    { field: "potencia", headerName: "Potencia", width: 150 },
  ];

  return (
    <div className="container">
      <div className="formulario">
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Marca"
            value={marca}
            onChange={(event) => setMarca(event.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Modelo"
            value={modelo}
            onChange={(event) => setModelo(event.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Ano"
            value={ano}
            onChange={(event) => setAno(event.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Capacidade"
            value={capacidade}
            onChange={(event) => setCapacidade(event.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Potencia em Cavalos"
            value={potencia}
            onChange={(event) => setPotencia(event.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <Button type="submit" variant="contained" color="primary">
            <PlusCircle />
            Adicionar Veículo
          </Button>
        </form>
      </div>
      <div className="tabela">
        <DataGrid rows={carros} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default Locadora;
