import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import { UsuarioModel } from '@/models/UsuarioModel';
import { conectarMongoDB } from '@/middlewares/conectarMongoDB';
import { validarTokenJWT } from '@/middlewares/validarTokenJWT';
import { SeguidorModel } from './SeguidorModel';

const endpointSeguir = 
    async (req :NextApiRequest,res : NextApiResponse<RespostaPadraoMsg>) => {
    try{
        if(req.method === 'PUT'){
            
            const {userId, id} = req?.query;
            //usuario logado/autenticado = quem esta fazendo as acoes
            const usuarioLogado = await UsuarioModel.findById(userId);
            if(!usuarioLogado){
                return res.status(400).json({erro : 'Usuario a ser seguido'})
            }
            
            const usuarioASerSeguido = await UsuarioModel.findById(id);
            if(!usuarioASerSeguido){
                return res.status(400).json({erro : 'Usuario a ser seguido nao encontrado'});
             }
             //inserir o registro?
             //e se ela ja segue??
            const euJaSigoesseUsuario =await SeguidorModel
               .find({usuarioId :usuarioLogado._id, usuarioseguidoId : usuarioASerSeguido._id});
               if(euJaSigoesseUsuario && euJaSigoesseUsuario.length > 0){
                //sinal que eu ja sigo  esse usuario
               }else{
                //sinal que eu nao sigo esse usuario
               }
        }
        return res.status(405).json({erro : 'Metodo informado nao existe'});
    }catch(e){
        console.log(e);
        return res.status(500).json({erro : 'Nao possivel seguir/ deseguir o usuario informado'});
    }
}

export default validarTokenJWT(conectarMongoDB(endpointSeguir));