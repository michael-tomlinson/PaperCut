/*
* Color print jobs require user confirmation
*
* Color printing is expensive so users should be encouraged to print
* in grayscale whenever they print in color.
*
* NOTE: this script requires page-level color detection to be enabled on the
* printer.
*/
 
function printJobHook(inputs, actions) {
  /*
  * This script will need access to the color pages in the job, which
  * is available after job analysis is complete. If job analysis is not
  * complete we exit here. See the user manual for more details.
  */
  if (!inputs.job.isAnalysisComplete) {
    return;
  }
 
  if (inputs.job.isColor) {
    // User is running the client software. Ask if they want to convert to
    // grayscale.
    if (inputs.client.isRunning) {
      // Message displayed to the user asking if they would like to convert the job
      // to grayscale
      var CONVERT_MESSAGE = 'Your job is in color and will cost ' + inputs.utils.formatCost(inputs.job.cost)
          + '. Would you like to convert your job to grayscale?  Selecting "No" will print in color.';
     
      var response = actions.client.promptYesNo(CONVERT_MESSAGE);
     
      if (response == 'YES')
      {
        actions.log.debug('User chose to convert their job to grayscale.');
        actions.job.convertToGrayscale();
      }
      else if (response == 'TIMEOUT')
      {
        actions.log.debug('Dialog timed out, canceling job.');
        actions.job.cancel();
      }
    }
    else {
      actions.log.debug('User chose to print in color.');
      return;
    }
  }
}
 