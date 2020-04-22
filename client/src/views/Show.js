import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { BestWorst, Seasons, ShowDetails, SearchForm } from './';
import api from '../api';
import pageTitle from '../pageTitle';

function Show(props) {
  const [show, setShow] = useState({});
  const [allSeasons, setAllSeasons] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);

  const handleShow = useCallback((tconst) => {
    api.show(tconst).then(data => {
      if(!data) {
        setError(true)
        setLoading(false)
      } else {
        setError(false)
        setShow(data)
        setLoading(false)
        pageTitle('show', data.primaryTitle)  
      }
    })
  }, [])

  useEffect(() => {
    handleShow(props.match.params.tconst)
  }, [props.match.params.tconst, handleShow]);

  return (
    <div className="px-2">
      <Row>
        <SearchForm />
      </Row>
      {error && 
        <Col xs={3}>
          <Alert variant="danger">Show Not Found</Alert>
        </Col>
      }
      {isLoading && <div>Loading ...</div>}
      {(!isLoading && !error) &&
        <Row>
          <Col lg={2} md={3} sm={4}>
            <ShowDetails show={show} />
            <BestWorst seasons={allSeasons} />
          </Col>
          <Col lg={10} md={9} sm={8} id="ratings" className="pl-4" style={{transform: `scale(${scale}`}}>
            <Seasons
              tconst={show.tconst}
              handleAllSeasons={setAllSeasons}
              handleScale={setScale}
              scale={scale}
            />
          </Col>
        </Row>
      }
    </div>
  );
}

export default Show;
