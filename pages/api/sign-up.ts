import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../apollo-client';
import uniqid from 'uniqid';
import { defaultAvatar } from '../../constants/game';
import { CREATE_PLAYER, SET_VALIDATION_EMAIL_TOKEN } from '../../queries/signup.queries';
import { getHashedPassword } from '../../utils/password';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await getHashedPassword(password);

    const createPlayerResponse = await client.mutate({
      mutation: CREATE_PLAYER,
      variables: {
        name,
        email,
        password: hashedPassword,
        isRegistered: true,
        hasVerifiedEmail: false,
        avatarId: defaultAvatar.id,
      },
    });

    const createdPlayer = createPlayerResponse.data?.createPlayer;

    if (!createdPlayer || !createdPlayer.id) {
      console.error('❌ Échec de la création du joueur.');
      return res.status(500).json({ error: 'Player creation failed.' });
    }

    const validationEmailToken = uniqid();

    const updateTokenResponse = await client.mutate({
      mutation: SET_VALIDATION_EMAIL_TOKEN,
      variables: {
        id: createdPlayer.id,
        validationEmailToken,
      },
    });

    const updatedPlayer = updateTokenResponse.data?.updatePlayer;

    if (!updatedPlayer || !updatedPlayer.validationEmailToken) {
      console.error('❌ Échec de l’ajout du token de validation.');
      return res.status(500).json({ error: 'Validation token update failed.' });
    }

    return res.status(201).json(updatedPlayer);
  } catch (err) {
    console.error('❌ Erreur serveur :', err);
    return res.status(400).json({ error: 'Something went wrong during signup.' });
  }
};

export default handler;
