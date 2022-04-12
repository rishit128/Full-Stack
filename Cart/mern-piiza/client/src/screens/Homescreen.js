import React, { useEffect } from 'react'
import Pizza from '../components/Pizza'
import pizzas from '../4.1 pizzasdata'
import { useDispatch} from 'react-redux'






function Homescreen() {
    const dispatch = useDispatch()
    // const pizzasstate = useSelector(state => state.getAllPizzasReducer)
    // const { pizzas, error, loading } = pizzasstate
 


    useEffect(() => {
       


    }, [])

    return (
        <div>
            {/* <Filter /> */}
         

        
            <br/>
            <div className='row justify-content-center' >
                {/* {loading ? (<Loading />
                ) : error ? (
                    <Error error='Something went Wrong' />

                ) : ( */}
                    {pizzas.map((pizza) => {
                        return (
                            <div key={pizza._id} className='col-md-3'>
                                <div >
                                    <Pizza pizza={pizza} />

                                </div>
                            </div>
                        );
                    })
                })

            </div>

        </div>
    )
}

export default Homescreen
