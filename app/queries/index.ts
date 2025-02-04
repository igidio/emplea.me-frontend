import clientSignupQuery from "./clientSignup.query";
import getUserByToken from "./getUserByToken.query";
import loginQuery from "./login.query";
import userUpdate from "./userUpdate.query.js";
import uploadImage from "./uploadImage.query.js";
import deleteImage from "./deleteImage.query.js";
import confirmationCreateForgotPassword from "./confirmationCreateForgotPassword.query.js";
import confirmationVerifyToken from "./confirmationVerifyToken.query.js";
import confirmationRecoveryAccount from "./confirmationRecoveryAccount.query.js";
import categoryGet from "./categoryGet.query.js";
import locationGet from "./locationGet.query";
import postFindOne from "./postFindOne.query";
import employerGetByUser from "./employerGetByUser.query";
import employerFindOne from "./employerFindOne.query";
import paymentCreateTransaction from "./paymentCreateTransaction.query";
import seekerGetOneByUser from "./seekerGetOneByUser.query";
import socialFindAll from "./socialFindAll.query";
import seekerSocialUpdate from "./seekerSocialUpdate.query";
import seekerSocialDelete from "./seekerSocialDelete.query";
import seekerSocialCreate from "./seekerSocialCreate.query";
import seekerSkillUpdate from "./seekerSkillUpdate.query";
import seekerSkillDelete from "./seekerSkillDelete.query";
import seekerSkillCreate from "./seekerSkillCreate.query";
import seekerFindAny from "./seekerFindAny.query";
import instituteFindAny from "./instituteFindAny.query";
import educationUpdate from "./educationUpdate.query";
import educationCreate from "./educationCreate.query";
import educationDelete from "./educationDelete.query";
import experienceUpdate from "./experienceUpdate.query";
import experienceCreate from "./experienceCreate.query";
import experienceDelete from "./experienceDelete.query";
import seekerChangeLocation from "./seekerChangeLocation.query";
import contactUpdate from "./contactUpdate.query";
// USER
import userChangePassword from "./userChangePassword.query";
import deleteEmployerImage from "./deleteEmployerImage.query";
import employerUpdate from "./employerUpdate.query";
import employerCreate from "./employerCreate.query";
// PHONE
import phoneUpdate from "./phoneUpdate.query";
import phoneCreate from "./phoneCreate.query";
import phoneDelete from "./phoneDelete.query";

import employerSocialUpdate from "./employerSocialUpdate.query";
import employerSocialDelete from "./employerSocialDelete.query";
import employerSocialCreate from "./employerSocialCreate.query";
// Post
import postCreate from "./postCreate.query";
import postUpdate from "./postUpdate.query";
//
import employerFindAll from './employerFindAll.query'
import employerVerify from './employerVerify.query'
import employerActivateOrDeactivate from './employerActivateOrDeactivate.query'

export {
	getUserByToken,
	loginQuery,
	clientSignupQuery,
	userUpdate,
	uploadImage,
	deleteImage,
	// contact
	contactUpdate,
	confirmationCreateForgotPassword,
	confirmationVerifyToken,
	confirmationRecoveryAccount,
	categoryGet,
	locationGet,
	postFindOne,
	employerGetByUser,
	employerFindOne,
	paymentCreateTransaction,
	seekerGetOneByUser,
	socialFindAll,
	seekerSocialUpdate,
	seekerSocialDelete,
	seekerSocialCreate,
	seekerSkillUpdate,
	seekerFindAny,
	seekerSkillDelete,
	seekerSkillCreate,
	instituteFindAny,
	educationUpdate,
	educationCreate,
	educationDelete,
	seekerChangeLocation,
	// experience
	experienceUpdate,
	experienceCreate,
	experienceDelete,
	userChangePassword,
	deleteEmployerImage,
	employerUpdate,
	employerCreate,
	// phone
	phoneUpdate,
	phoneCreate,
	phoneDelete,
	// Emnployer Social
	employerSocialUpdate,
	employerSocialDelete,
	employerSocialCreate,
	// Post
	postCreate,
	postUpdate,
	// Employer
	employerFindAll,
	employerVerify,
	employerActivateOrDeactivate,
};
