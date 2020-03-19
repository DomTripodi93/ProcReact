import React from 'react';
import SingleBestPractice from './single-best-practice';

const BestPractices = props => {
    return(
        <div>
            {props.bestPractices.length > 0 ?
                <div>
                    <div className='grid50'>
                        {props.bestPractices.map(bestPractice=>(
                            <div 
                                key={bestPractice.id}
                                >
                                <SingleBestPractice
                                    bestPractice={bestPractice}
                                    inDept={true} />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="border centered">
                    <h4 className="spaced">
                        You currently don't have any common difficulties! 
                    </h4>
                    <h4 className="spaced">
                        Add some common difficulties using the button above to see them here.
                    </h4>
                </div>
            }
        </div>
    )
}


export default BestPractices;