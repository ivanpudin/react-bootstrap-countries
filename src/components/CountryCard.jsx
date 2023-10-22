import { Card, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { addFavourite, removeFavourite } from "../features/countries/favouritesSlice";

const CountryCard = ({ country }) => {
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const dispatch = useDispatch();

    return (
            <Col className="mt-5">
             
                <Card className="h-100">
                  {favouritesList?.includes(country.name.common) ? (
                    <i
                    className="bi bi-heart-fill text-danger m-1 p-1"
                    onClick={() => dispatch(removeFavourite(country.name.common))}></i>
                  ) : (
                    <i
                    className="bi bi-heart text-danger m-1 p-1"
                    onClick={() => dispatch(addFavourite(country.name.common))}></i>
                  )}
                    <LinkContainer
                 to={`/countries/${country.name.common}`}
                 state={{ country: country }}
               >
                <div>
                <Card.Img
                    variant="top"
                    src={country.flags.svg}
                    className="rounded h-50"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{country.name.common}</Card.Title>
                    <Card.Subtitle className="mb-5 text-muted">
                      {country.capital}
                    </Card.Subtitle>
                    <ListGroup
                      variant="flush"
                      className="flex-grow-1 justify-content-end"
                    >
                      <ListGroup.Item>
                        <i className="bi bi-translate me-2">
                          {Object.values(country.languages ?? {}).join(", ")}
                        </i>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-cash-coin me-2">
                          {Object.values(country.currencies ?? {})
                            .map((currency) => currency.name)
                            .join(", ")}
                        </i>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-people me-2">
                          {country.population.toLocaleString()}
                        </i>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                  </div>
              </LinkContainer>
                </Card>
            </Col>
    )
}

export default CountryCard