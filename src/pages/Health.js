import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import ScrollReveal from 'scrollreveal';
import { HEALTH_LOGS_URL } from '../apiConfig';
import HealthForm from '../components/HealthForm'; 
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap'; 
import { CgOverflow } from "react-icons/cg";

function Health() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [logToEdit, setLogToEdit] = useState(null); 

  useEffect(() => {
    ScrollReveal({ reset: true, distance: '60px', duration: 2500, delay: 400 });
    ScrollReveal().reveal('.main-title', { delay: 500, origin: 'left' });
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(HEALTH_LOGS_URL);
      console.log("Fetched logs:", response.data);
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setError("Failed to fetch logs.");
    }
  };

  const handleEdit = (log) => {
    setLogToEdit(log);
  };

  return (
    <div>
      <Navbar />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');
    </style>
    <div className="health">
      <Row style={{marginTop:'100px',}}>
        <Col>
          <h1 className="text-center">Healthy Vibes, Wealthy Lives!</h1>
          <HealthForm onLogSubmitted={fetchLogs} logToEdit={logToEdit} setLogToEdit={setLogToEdit} />
        </Col>
      </Row>

      <h2 className="text-center">Your Health Logs</h2>

      <Row className="mt-4 justify-content-center">
        <Col xs={12} md={2}>
          <Card className="bg-dark text-white shadow-sm">
            <Card.Body>
              <ListGroup variant="flush">
                {logs.length > 0 ? (
                  logs.map((log, index) => (
                    <ListGroup.Item key={index} className="bg-dark text-white">
                      <p><strong>Date:</strong> {log.date}</p>
                      <p><strong>Weight:</strong> {log.weight} kg</p>
                      <p><strong>Water Intake:</strong> {log.waterIntake} L</p>
                      <p><strong>Exercise:</strong> {log.exercise} mins</p>
                      <Button variant="primary" className="btn-custom" onClick={() => handleEdit(log)}>Edit</Button>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item className="bg-dark text-white">No health logs found.</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
    </div>
  );
}

export default Health;
