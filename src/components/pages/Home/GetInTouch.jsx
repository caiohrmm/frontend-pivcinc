import React from 'react'
import {  
    Button,
    Stack,
} from '@mui/material'
import Title from './Title'
import Paragraph from './Paragraph'
import { Link } from 'react-router-dom'

const GetInTouch = () => {

    return (
        <Stack 
        component='section'
        direction="column"
        justifyContent= 'center'
        alignItems='center'
        sx={{
            py: 10,
            mx: 6,
        }}
        >
            <Title
            text={
                'Seja Pivcinc agora mesmo!  '
                } 
            textAlign={'center'}
            
            />
            <Paragraph 
            text={
                'Se livre agora mesmo do vício entrando em nosso sistema e conhecendo pessoas que passam pela mesma dificuldade que você!'
            }
            maxWidth = {'sm'}
            mx={0}
            textAlign={'center'}
            color={"#fff"}

            />
            <Button component={Link} 
            to={'/register'}
            variant="contained" 
            type="submit"
            size="medium"
            sx= {{ 
                fontSize: '0.9rem',
                textTransform: 'capitalize', 
                py: 2,
                px: 4,
                mt: 3, 
                mb: 2,
                borderRadius: 0,
                backgroundColor: '#14192d',
                "&:hover": {
                    backgroundColor: '#1e2a5a',
                }
            }}
            >
                Registrar
            </Button>
 
        </Stack>
    )
}

export default GetInTouch;