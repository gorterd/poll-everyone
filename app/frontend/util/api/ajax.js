import jQuery from 'jquery';
import { CSRFProtection } from '@rails/ujs';

jQuery.ajaxPrefilter((options, originalOptions, xhr) => {
  if (!options.crossDomain) CSRFProtection(xhr);
});

export default jQuery.ajax;