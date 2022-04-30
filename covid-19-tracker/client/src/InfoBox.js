import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"

function InfoBox({title, cases, total}) {
  return (
    <Card className='infobox'>
        <CardContent>
            <Typography className='infoboxtitlr' color = "textSecondary">
                {/* Title: Corona Virus Cases*/}
                {title}
            </Typography>

            {/* Number of Cases*/}
            <h2 className='infoboxcases'>{cases}</h2>

            {/* Total Cases*/}
            <Typography className='infoboxtotal'color='textSecondary'>
                {total} Total
            </Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox