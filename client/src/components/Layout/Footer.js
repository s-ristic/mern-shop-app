import React from 'react';
import { Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';

import Icon from '../UI/Icon';

function Footer() {
  return (
    <footer className='py-3 bg-primary text-light'>
      <Container>
        <Row>
          <Col
            sm={12}
            lg={4}
            className='d-flex justify-content-center justify-content-lg-start align-items-center mb-3 mb-lg-0'>
            <span>Application made in MERN Stack</span>
          </Col>
          <Col sm={12} lg={4} className='d-flex justify-content-center align-items-center'>
            <ListGroup variant='flush' className='flex-row'>
              <ListGroup.Item as='li' className='p-0 border-0'>
                <Button
                  href='https://www.facebook.com/savo.ristic'
                  target='_blank'
                  rel='noreferrer'
                  title='Facebook'>
                  <Icon facebook />
                </Button>
              </ListGroup.Item>
              <ListGroup.Item as='li' className='p-0 border-0'>
                <Button
                  href='https://www.linkedin.com/in/savo-ristic-sr'
                  target='_blank'
                  rel='noreferrer'
                  title='LinkedIn'>
                  <Icon linkedin />
                </Button>
              </ListGroup.Item>
              <ListGroup.Item as='li' className='p-0 border-0'>
                <Button
                  href='https://github.com/s-ristic'
                  target='_blank'
                  rel='noreferrer'
                  title='Github'>
                  <Icon github />
                </Button>
              </ListGroup.Item>
              <ListGroup.Item as='li' className='p-0 border-0'>
                <Button href='mailto:​savoristic@pm.me' title='savoristic@pm.me'>
                  <Icon envelope />
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col
            sm={12}
            lg={4}
            className='d-flex justify-content-center justify-content-lg-end align-items-center text-uppercase'>
            <span className='mr-2'>Powered by</span>
            <Button
              href='https://savo-ristic-portfolio.netlify.app/'
              target='_blank'
              rel='noreferrer'>
              <Image
                src='./images/author-logo.webp'
                alt='Author Logo'
                style={{ height: '30px', cursor: 'pointer' }}
              />
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
