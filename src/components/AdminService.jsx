import { useContext, useEffect } from "react";
import { Table, Form, Accordion, Badge } from "react-bootstrap";
import { GlobalContext } from "./context/Contex";
import NavBar from "./NavBar";

export function AdminService() {
  const token = JSON.parse(window.localStorage.getItem("token"));

  const { getAutos, autos, getAutoDetail } = useContext(GlobalContext);
  console.log(autos);
  useEffect(() => {
    getAutos(token);
  }, []);

  let autoSelect = undefined;
  const handleChangeAuto = async (e) => {
    console.log(e.target.value);
    autoSelect = await getAutoDetail(e.target.value, token);
    console.log(autoSelect);
  };

  return (
    <>
      <NavBar />
      {autos.map((auto) => {
        return (
          <Accordion  key={auto._id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{auto.vehiculo}</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover  size="sm" responsive>
                  <thead>
                    <th>Categoría</th>
                    <th>Realizado el dia</th>
                    <th>Lugar</th>
                    <th>Proximo service en:</th>
                    <th>Fue renovado?</th>
                  </thead>
                  <tbody>
                    {auto.service.map((s) => {
                      return (
                        <>
                          <tr>
                            <td>{s.categoria}</td>
                            <td>{s.create_at}</td>
                            <td>{s.lugar}</td>

                            {s.nextServiceKm -
                              (auto.kilometraje - s.currentKm) >=10000 ? 
                              (
                                <td>
                                  <Badge bg="info">
                                  {s.nextServiceKm -
                                    (auto.kilometraje - s.currentKm)}{" "}
                                  km
                              </Badge>
                                </td>
                            ) : s.nextServiceKm -
                            (auto.kilometraje - s.currentKm) >=5000 ?  (
                              <td>
                                  <Badge bg="warning">
                                  {s.nextServiceKm -
                                    (auto.kilometraje - s.currentKm)}{" "}
                                  km
                              </Badge>
                                </td>
                            ):
                            <td>
                            <Badge bg="danger">
                              {s.nextServiceKm -
                                (auto.kilometraje - s.currentKm)}{" "}
                              km
                          </Badge>
                            </td>
                          }
                          <td><Form.Check aria-label="option 1" /></td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </>
  );
}
