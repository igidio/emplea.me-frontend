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

export {
	getUserByToken,
	loginQuery,
	clientSignupQuery,
	userUpdate,
	uploadImage,
	deleteImage,
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
	// experience
	experienceUpdate,
	experienceCreate,
	experienceDelete
};
