/**
 * @file
 * NP8 ADTECH implementation.
 */

// Define ADTECH variable.
var ADTECH;

/**
 * Attaches behavior for the NP8 ADTECH.
 *
 * Looping over ads positions from ADTECH settings and adding the position placement id to the ADTECH queue.
 *
 */
(function ($, Drupal, drupalSettings, ADTECH) {
  'use strict';

  if (typeof ADTECH !== 'undefined') {
    Drupal.behaviors.np8_adtech = {
      attach: function (context) {

        if (drupalSettings.np8_adtech) {
          ADTECH.config.page = drupalSettings.np8_adtech.site_config;

          if (drupalSettings.np8_adtech.positions) {
            var position;
            for (position in drupalSettings.np8_adtech.positions) {
              if (drupalSettings.np8_adtech.positions.hasOwnProperty(position)) {
                $(context).find('#' + drupalSettings.np8_adtech.positions[position]['adContainerId']).once('np8-adtech').each(function (index, element) {
                  ADTECH.enqueueAd(drupalSettings.np8_adtech.positions[position]);
                });
              }
            }

            ADTECH.executeQueue();
          }
        }
      }
    };
  }

}(jQuery, Drupal, drupalSettings, ADTECH));
;
/**
 * @file
 * LT ADTECH implementation.
 */

/**
 * Adds viewport information to the drupal settings.
 */
(function ($, Drupal, drupalSettings) {
  'use strict';

  // Add viewport width value to the ADTECH settings.
  drupalSettings.np8_adtech.site_config.kv = drupalSettings.np8_adtech.site_config.kv || {};
  drupalSettings.np8_adtech.site_config.kv.scrbrt = $(window).width();

}(jQuery, Drupal, drupalSettings));
;
