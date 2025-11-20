// questo componente servirà a RECUPERARE le prenotazioni dei tavoli esistenti
// e le mostrerà all'interno di una ListGroup di react-bootstrap

import { Component } from 'react'
import { Col, Container, Row, ListGroup } from 'react-bootstrap'

// questo processo l'abbiamo già esplorato all'interno di un documento HTML
// ma non sappiamo come approcciare il problema nei singoli componenti React

// dobbiamo come sempre bilanciare la UX (cioè non dobbiamo fossilizzare
// il caricamento della nostra pagina con un documento "bianco")
// dobbiamo cercare di fornire una UX che quanto prima mostri all'utente le
// parti STATICHE della pagina (titoli, navbar, indicatori di caricamento)
// e poi la chiamata remota ci metterà il tempo che ci metterà (fuori dal nostro
// controllo)

// chicca: quando c'è da creare un componente che mostrerà dei dati prelevati
// da una API, il componente avrà bisogno di uno STATE -> Class Component

class Bookings extends Component {
  state = {
    prenotazioni: [], // ottimo valore iniziale, ospiterà in futuro
    // un array di oggetti
  }

  getBookings = function () {
    // questa funzione recupererà dalle API l'elenco delle prenotazioni esistenti
    // utilizzeremo l'endpoint:
    const URL = 'https://striveschool-api.herokuapp.com/api/reservation'
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          // posso continuare a estrarre il JSON per ottenere l'array
          // delle prenotazioni
          return response.json()
        } else {
          throw new Error('la chiamata non è ok: ' + response.status)
        }
      })
      .then((arrayOfBookings) => {
        console.log('PRENOTAZIONI A DB', arrayOfBookings)
        // non possiamo arrivati qua manipolare direttamente il DOM
        // dobbiamo "parcheggiare" questo array di prenotazioni in un posticino
        // raggiungibile anche dal JSX del componente Bookings
        // questo "posticino" è SEMPRE l'anello di collegamentro tra la LOGICA
        // del componente e l'INTERFACCIA del componente
        // questo "posticino" è l'oggetto STATE

        // riempiamo "prenotazioni" nello state con arrayOfBookings
        this.setState({
          prenotazioni: arrayOfBookings, // sovrascrivo l'array vuoto iniziale
          // con un array di prenotazioni
        })
      })
      .catch((err) => {
        console.log('Errore nella chiamata', err)
      })
  }

  // N.B: ogni volta che in un componente viene eseguito un setState(), react
  // RE-INVOCA automaticamente il metodo render()

  // render() è un METODO DI LIFE-CYCLE DEL COMPONENTE A CLASSE.
  // render() viene eseguito automaticamente da React quando il componente SI "MONTA"
  // render() viene anche RE-INVOCATO ad ogni CAMBIO di stato e ad ogni cambio di props: questo serve
  // internamente a mantenere "in sync" i DATI del componente con la sua INTERFACCIA

  // quindi, se render() non è il posto giusto per invocare la nostra funzione getBookings
  // che fa una fetch e salva il risultato nello stato, dove la invocheremo?

  // ci serve un posto che NON venga ri-eseguito quando facciamo un setState
  // ci serve un posto che ci garantisca venire eseguito UNA VOLTA SOLA
  // ci serve un posto che venga eseguito DOPO la prima esecuzione di render()
  // -> in questo modo la PRIMA invocazione di render() servirà a portare nella pagina
  // le parti di interfaccia "statiche": i titoli, i container, gli indicatori di caricamento

  // la risposta a TUTTE queste richieste è un secondo metodo di lifecycle
  // il metodo componentDidMount()
  // è un metodo PERFETTO per invocare tutte quelle operazioni che necessitano
  // di venire eseguite all'avvio del componente (ad es. le fetch)

  componentDidMount() {
    // viene eseguito DOPO il primo render
    console.log('SONO COMPONENTDIDMOUNT')
    // viene eseguito una volta sola
    // NON verrà ri-eseguito a cambi di state o di props

    this.getBookings()
  }

  render() {
    console.log('SONO IN RENDER')
    return (
      <Container>
        <Row className="justify-content-center my-3">
          <Col xs={12} md={6}>
            <h2 className="text-center">PRENOTAZIONI A DB</h2>
          </Col>
        </Row>
        <Row className="justify-content-center my-3">
          <Col xs={12} md={6}>
            <ListGroup>
              {
                // qui farò un map dell'array delle prenotazioni e per
                // ogni elemento ritornerò un ListGroup.Item
                this.state.prenotazioni.map((booking) => {
                  return (
                    <ListGroup.Item key={booking._id}>
                      {booking.name} per {booking.numberOfPeople}
                    </ListGroup.Item>
                  )
                })
              }
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Bookings
