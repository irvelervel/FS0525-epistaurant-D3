import { Container, Row, Col, Carousel, ListGroup } from 'react-bootstrap'
import pastasciutte from '../data/menu.json'
import { Component } from 'react'
import PastaReviews from './PastaReviews'
// pastasciutte è un array di OGGETTI
// sono andato a prenderlo dal file menu.json

// STATE -> lo state è uno "stato", una "memoria" che è possibile incastonare
// nei componenti React. Serve a mantenere "sincronizzata" l'interfaccia
// con determinati eventi o situazioni

// useremo lo STATO del componente per mantenere in "memoria" quale sia
// la slide ATTUALMENTE visualizzata. Prima cosa: per avere un state, il
// componente React dev'essere stato creato come CLASSE

class Home extends Component {
  state = {
    // non può chiamarsi giangiorgio
    // qui dentro ci metterete TUTTE le proprietà di cui vorrete
    // mantenere una "memoria" nel ciclo vita del componente
    // mi memorizzo nello stato quale sia la pasta attualmente visualizzata
    activePasta: pastasciutte[0], // carbonara
  }

  render() {
    return (
      <Container className="mt-3">
        <Row className="justify-content-center">
          <Col xs={12}>
            <h1 className="text-center my-3">
              Le migliori pastasciutte del web!
            </h1>
          </Col>

          {/* <Col className="col col-12 col-md-8 col-lg-4"> */}
          <Col xs={12} md={8} lg={6}>
            {/* il valore di una prop va tra " " se è una stringa, o
        tra { } se è qualsiasi valore NON stringa */}
            <Carousel
              onSlid={(i) => {
                // console.log('SLIDE CAMBIATA', i)
                // con questo indice io voglio andare a cambiare quale elemento
                // dell'array pastasciutte verrà salvato dentro lo stato

                // ogni volta che cambia la slide -> aggiorno lo stato
                // this.state.activePasta <-- questa è la proprietà activePasta
                // PERÒ: l'oggetto STATE in un componente è READ-ONLY
                // lo stato di un componente va RICREATO OGNI VOLTA
                this.setState({
                  activePasta: pastasciutte[i],
                })
              }}
            >
              {pastasciutte
                // paste che cominciano con C :)
                // .filter((pasta) => pasta.name.charAt(0) === 'C')
                .map((pasta) => {
                  // con il map sto riuscendo a trasformare un array di oggetti
                  // in un array di Carousel.Item in JSX
                  return (
                    // OGNI VOLTA che fate un .map, dovete assegnare all'elemento
                    // RITORNATO dal map una prop che si chiama "key"
                    // questa "key" deve avere un valore DIVERSO per ogni elemento
                    // generato dinamicamente con il map. In questo modo
                    // react sa DISTINGUERE tra gli ementi
                    <Carousel.Item key={pasta.id}>
                      <img src={pasta.image} className="w-100" />
                      <Carousel.Caption>
                        <h3>{pasta.name}</h3>
                        <p>{pasta.description}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                })}
            </Carousel>
          </Col>
        </Row>

        <Row className="justify-content-center my-3">
          <Col xs={12} md={8} lg={6}>
            <PastaReviews pasta={this.state.activePasta} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home
