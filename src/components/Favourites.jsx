import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../features/countries/countriesSlice";
import { clearFavourites, getFavouritesFromSource } from "../features/countries/favouritesSlice";
import CountryCard from "./CountryCard";


const Favourites = () => {
    const dispatch = useDispatch()

    let countriesList = useSelector((state) => state.countries.countries)
    const countriesLoading = useSelector((state) => state.countries.loading)
    const favouritesLoading = useSelector((state) => state.favourites.isLoading) 
    const [search, setSearch] = useState("")
    const favouritesList = useSelector((state) => state.favourites.favourites)  

    if (favouritesList !== null) {
        countriesList = countriesList.filter(c => favouritesList.includes(c.name.common))
    }
    else {
        countriesList = []
    }

    useEffect(() => {
      dispatch(initializeCountries())
      dispatch(getFavouritesFromSource())
    }, [dispatch])

    if (countriesLoading || favouritesLoading) {
        return (
        <Col className="text-center m-5">
          <Spinner
            animation="border"
            role="status"
            className="center"
            variant="info"
            >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
        )
      }

    return (<Container fluid style={{ minHeight: 'calc(100vh - 144px)' }}>
        <Row>
          <Col className="mt-5 d-flex justify-content-center">
            <Form>
              <Form.Control
                style={{ width: '18rem' }}
                type="search"
                className="me-2 "
                placeholder="Search for countries"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
        <Row xs={2} md={3} lg={4} className=" g-3 d-flex align-items-center justify-content-center m-2">
        <Button onClick={() => {
          dispatch(clearFavourites())
        }}>Clear Favourites</Button>
        </Row>
        <Row xs={2} md={3} lg={4} className=" g-3">
          {countriesList
            .filter((c) => {
              return c.name.official.toLowerCase().includes(search.toLowerCase());
            })
            .map((country) => (
              <CountryCard key={country.name.common} country={country} />
            ))}
        </Row>
      </Container>)
}

export default Favourites;