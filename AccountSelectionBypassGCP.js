/*
* Bypass account selection popups when using Google Cloud Print or Email to Print
*
* This recipe allows users to bypass account selection and have jobs automatically 
* charged to their personal accounts when using Google Cloud Print or Email to Print. 
* This is useful in cases when the user would be unable to select a shared account due 
* to them not having access to the user client (e.g. sending a print job from a 
* mobile device).
* 
* Note: this will charge the job to the personal account, even if the user is set with 
* 'Allow user to charge to their personal account' unchecked. Alternatively, if GCP users
* are required to select an account, they should instead use the Mobile Client (see the Mobile
* Client section of the manual for more information).
*/
function printJobHook(inputs, actions){  
  
  if (inputs.job.jobSourceName == "GOOGLE_CLOUD_PRINT"){
    // Google Cloud Print job, automatically charge to personal account
    actions.job.chargeToPersonalAccount();
  }
  
  if (inputs.job.jobSourceName == "EMAIL_PRINTING"){
    // Email to Print job, automatically charge to personal account
    actions.job.chargeToPersonalAccount();
  }
  
  /**
  * The checks made above need to be made BEFORE the job analysis is complete or 
  * it may be too late to supress the account selection popup.
  */
  if (!inputs.job.isAnalysisComplete) {
    return;
  }
}​