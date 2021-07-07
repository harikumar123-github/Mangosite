import React, { useEffect } from 'react'
import '../App.css'
import Button from '@material-ui/core/Button'
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Rating from '@material-ui/lab/Rating' 
import Loading from './Loading'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { listData } from '../actions/dataActions'
import { Link } from 'react-router-dom';
import { Card, Grid, CardContent, CardMedia, Container, CardActions, Typography } from '@material-ui/core'
import useStyles from "../Style"

export default function Home(props) {

    const dispatch = useDispatch()
    const classes = useStyles()

    const dataList = useSelector( state => state.dataList)
    const { loading, error, data } = dataList

    useEffect( () => {
        dispatch(listData())
    }, [dispatch])

    return (
    <>
        <div className="heading">
            <h1>Mangoes</h1>
        </div>

        <div className="underline">
            <div></div>
        </div>

        { loading? <Loading /> : error?<Message varient='danger'>{error}</Message>:(
            <Container className={classes.cardGrid} maxwidth="md">
            <Grid container spacing={4}>
              {data.map( (mango, id) => (
                <Grid item xs={12} sm={4} md={3} key={id}>
                  <Card className={classes.card}>
                    <CardMedia className={classes.cardMedia} image="https://freesvg.org/img/manggo.png" title="mango"/>
                    <CardContent className={classes.cardContent}>
                      <Typography vairant="h5" gutterBottom>
                        Heading
                      </Typography>
                      <Typography>
                        A nice description about photo
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="secondary">View</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )


        // <div className="mangoes">
        //     {data.map( (mango,ind) => {
        //         return (
        //             <div key={mango._id} className='box'>
        //                     <div className="mango">

        //                         <Link to={`/mango/${mango._id}`}> <img src={mango.image} alt={mango.name}/> </Link>

        //                         <div className="description">
        //                             <Link to={`/mango/${mango._id}`}>
        //                                 <h4>{mango.name}</h4>

        //                                 <div className="content" style={ {display: 'flex' , justifyContent: 'space-between'}} >

        //                                     <Rating precision={0.1} value={mango.rating} readOnly={true}  />

        //                                     <h6 style={ {paddingRight : '0.8em', fontSize: '1.1em'} }> 
        //                                         <p> <span>&#8377;</span> {mango.cost}</p> 
        //                                     </h6>

        //                                 </div>

        //                                 <p>{mango.description}</p>
        //                             </Link>

        //                             <div className="center">

        //                                 {!mango.instock && (<Button
        //                                     disabled
        //                                     startIcon={<NotInterestedIcon/>}
        //                                     style={ { 
        //                                         width:'90%',
        //                                         backgroundColor: 'lightgray',
        //                                         color: 'black',
        //                                     }
        //                                     } varient="outlined">
        //                                     Out of Stock
        //                                 </Button>)}

        //                             </div>
        //                         </div>

        //                     </div>
                        
        //             </div>
        //         )
        //     } )
            // }
        // </div>
        }
    </>
    )
}
