function reload(){
    var result = '<pre>';

    


    var cid = document.getElementById('cid').value;
    var campaignName = document.getElementById('campaignName').value;
    var run = document.getElementById('run').value;
    var offer = document.getElementById('offer').value;
    var suppressedCountries = document.getElementById('suppressedCountries').value;
    var enabledLicenses = document.getElementById('enabledLicenses').value;
    var illegalLicenses = document.getElementById('illegalLicenses').value;
    var limit = document.getElementById('limit').value;
    var abTest = document.getElementById('abTest').value;
    var offerNames = document.getElementById('offerNames').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var tracking = document.getElementById('tracking').value;
    var urlDomain = document.getElementById('urlDomain').value;
    var frequency = document.getElementById('frequency').value;
    var count = document.getElementById('count').value;
    var avStatus = document.getElementById('avStatus').value;
    var dayOfWeek = document.getElementById('dayOfWeek').value;
    
    
    



    result += '// webhalla chain: cid' + cid + '-dis-prg</br>'; 
    result += '// CMMS: '+ campaignName + '</br>';
    result += '// cid: ' + cid + '</br></br>';
    //result += '// run: $IDMARK_C' + cid + 'T</br>';
    //result += '// offer: $IDMARK_C' + cid + 'O</br></br>';
    result += 'private $run = ' + run + ';</br>';
    result += 'private $cid = ' + cid + ';</br></br>';

    result += '// Cleaning - if you want clean all campaign marks</br>';
    result += '/*</br>';
    result += ' if ( exists $IDMARK_C' + cid + 'T ) {</br>';
    result += '     unset $IDMARK_C' + cid + 'O;</br>';
    result += '     unset $IDMARK_C' + cid + 'T;</br>';
    result += '     pushbi(true,$cid."e98",$run);</br>';
    result += '     sethead( $cid."e98", $run);</br>';
    result += '     back;</br>';
    result += ' }</br>';
    result += '*/</br></br>';
    result += '';


    result += '//Rollback - if you want to rollback campaign please uncomment following code</br>';
    result += '/*</br>';
    result += 'if ( exists $IDMARK_C' + cid + 'T ) {</br>';
    result += '     if ( $IDMARK_C' + cid + 'T <= $run ) {</br>';
    result += '         if ( $IDMARK_C' + cid + 'O == 99 ) back;</br>';
    result += '         else if ( $IDMARK_C' + cid + 'O < 99 ) {</br>';
    result += '             $IDMARK_C' + cid + 'O = 99;</br>';
    result += '             sethead( "x-avg-tnp-auto", "");</br>';
    result += '             pushbi(true,$cid."e97",$run);</br>';
    result += '             sethead( $cid."e97", $run);</br>';
    result += '             back;</br>';
    result += '         }</br>';
    result += '     }</br>';
    result += '}</br>';
    result += '*/</br></br>';

    result += '//Stop distribution - if you want to stop this campaign uncomment folowing back</br>';
    result += '//back;</br></br>';

    result += '// Conditions</br>';
    result += 'if ( exists $AKCE_MAKEID ) {</br>';
    result += '     sethead( $cid."e95", "akce MAKEID");</br>';
    result += '     back;</br>';
    result += '}</br></br>';

    result += 'if (! exists $Instance_LicID) {</br>';
    result += '     sethead( $cid."e95", "licId does not exists");</br>';
    result += '     back;</br>';
    result += '}</br></br>';

    result += 'if ( exists $globalTrmTargetted ) back; // other trm campaign is distributed</br>';
    result += 'if ($IDMARK_C' + cid + 'T == $run) back;    // campaign was already distributed</br></br>';

    result += 'if ($avg_ver gbn< "16.22.1.58906") {    // build check</br>';
    result += '     pushbi(true,$cid."e95",1);</br>';
    result += '     sethead( $cid."e95", 1);</br>';
    result += '     back;</br>';
    result += '}</br></br>';

    result += '// other promolink is distributed</br>';
    result += 'private $checkGlobalPromoLinkNonExistence = cmpPcTuGlobalPromolinkCheck("autoPromolink",$globalAutoPromoLink,$globalManualPromoLink);</br>';
    result += 'if (! $checkGlobalPromoLinkNonExistence ) {</br>';
    result += '     pushbi(true,$cid."e95",2);</br>';
    result += '     sethead( $cid."e95", 2);</br>';
    result += '     back;</br>';
    result += '}</br></br>';

    result += '// license was sent in other campaign</br>';
    result += 'if ( exists $globalSentLicense or exists $globalTrmTargetted ) {</br>';
    result += '     pushbi( true,$cid."e95", 3 );</br>';
    result += '     sethead( $cid."e95", 3);</br>';
    result += '     back;</br>';
    result += '}</br></br>';  
    
    result += '// user is not from targeted country</br>';
    result += '//if (! $ctry in "AU;IT;NL;FR;UK;US;DE;IE;ZA;AR;MX;ES;CH;AT;CZ;BE;PL;DK;PT;SE;SK;NO;IN;RU") {</br>';
    result += 'if ($ctry in "' + suppressedCountries + '") {</br>';
    result += '     pushbi( true,$cid."e95", 4 );</br>';
    result += '     sethead( $cid."e95", 4);</br>';
    result += '     back;</br>';
    result += '}</br></br>';

    result += '// enabled licenses</br>';
    result += 'if (! $lic_lct in "' + enabledLicenses + '") {</br>';
    result += '     pushbi( true,$cid."e95", 5 );</br>';
    result += '     sethead( $cid."e95", 5);</br>';
    result += '     back;</br>';
    result += '}</br></br>';
    
    result += '// illegal suppress</br>';
    result += 'if ($lic_licr != "0") {</br>';
    result += '     pushbi( true,$cid."e95", 6 );</br>';
    result += '     sethead( $cid."e95", 6);</br>';
    result += '     back;</br>';
    result += '}</br></br>';

    result += 'private $secondsAfterInstallation = $datetime_ts - $tmInstance_Created;</br></br>';
    
    result += 'if (exists $IDMARK_TESTTIME) {</br>';
    result += '     $secondsAfterInstallation = $IDMARK_TESTTIME;</br>';
    result += '}</br>';

    result += '// free at least 1 day after installation</br>';
    result += 'if ($lic_lct == "1"){</br>';
    result += '     if ($secondsAfterInstallation <= 86400) {</br>';
    result += '     pushbi( true,$cid."e95", 7 );</br>';    
    result += '     sethead( $cid."e95", 7);</br>';
    result += '     back;</br>';
    result += '     }</br>';
    result += '}</br></br>';

    result += '// suppress trial up to 3 days after expiration</br>';
    result += 'if ($lic_lct == "2"){</br>';
    result += '     if ($lic_vap == "30"){</br>';
    result += '         if ($secondsAfterInstallation <= 2851200) {</br>';
    result += '             pushbi( true,$cid."e95", 8 );</br>';
    result += '             sethead( $cid."e95", 8);</br>';
    result += '             back;</br>';
    result += '         }</br>';
    result += '     } else if ($lic_vap == "7") {</br>';
    result += '         if ($secondsAfterInstallation <= 864000) {</br>';
    result += '             pushbi( true,$cid."e95", 8 );</br>';
    result += '             sethead( $cid."e95", 8);</br>';
    result += '             back;</br>';
    result += '         }</br>';
    result += '     } else if ($lic_vap == "1") {</br>';
    result += '         if ($secondsAfterInstallation <= 345600) {</br>';
    result += '             pushbi( true,$cid."e95", 8 );</br>';
    result += '             sethead( $cid."e95", 8);</br>';
    result += '             back;</br>';
    result += '         }</br>';
    result += '     }</br>';
    result += '}</br></br>';

    result += '// suppress paid up to 14 days after purchase and less than 30 days before expiration</br>';
    result += 'if ($lic_lct == "4"){</br>';
    result += '     if ($secondsAfterInstallation <= 1209600) {</br>';
    result += '         pushbi( true,$cid."e95", 9 );</br>';
    result += '         sethead( $cid."e95", 9);</br>';
    result += '         back;</br>';
    result += '     }</br>';
    result += '     if ($lic_dte < 30) {</br>';
    result += '         pushbi( true,$cid."e95", 9 );</br>';
    result += '         sethead( $cid."e95", 9);</br>';
    result += '         back;</br>';
    result += '     }</br>';
    result += '}</br></br>';

    result += '// AB test + pilot limit</br>';
    result += 'private $pilotLimit = ' + limit + ';</br>';
    result += 'command tcounter "c' + cid + 'test ".$pilotLimit." 864000";</br></br>';

    result += 'if ($tcounter_c' + cid + 'test_max_reached) {</br>';
    result += '     sethead( $cid."e95", 10);</br>';
    result += '     back;</br>';
    result += '}</br></br>';

    result += 'private $offer = distrib($tcounter_c' + cid + 'test, ' + abTest + ');</br>';
    result += 'private $offerName = $offer from "' + offerNames + '";</br></br>';

    result += '// offer variables</br>';
    result += 'private $promoStartDate = ' + startDate + ';</br>';
    result += 'private $promoEndDate = PromoTuEndDate("' + endDate + '");</br>';
    result += 'private $promolinkTracking = "' + tracking + '";</br>';
    result += 'private $webUrl = UrlDomain("' + urlDomain + '")."/".$cid."/".$offerName."/".$cmp_all_loc.".html";</br>';
    result += 'private $promoFreq = ' + frequency + ';</br>';
    result += 'private $promoCount = ' + count + ';</br></br>';
    
    result += 'if ($lic_lct == "4"){</br>';
    result += '     $promoCount = 1; // for paid users 1 in total</br>';
    result += '}</br></br>';

    result += 'private $promoAvStatus = "' + avStatus + '"; // yes - only show if AV is installed, no - only show if AV is NOT installed, nevermind - always show</br>';
    result += 'private $promoDayOfWeek = "' + dayOfWeek + '";</br>';
    result += 'private $cidAttrTracking = concat("?iid=", $Instance_Instance);</br>';
    result += 'private $promoHash = concat("c",$cid,"o",$offer,"e",$run);</br>';
    result += 'private $zenPresent = $avg_zen_present from "0,pct;1,gse";</br>';
    result += 'private $trackingZen = "-".$zenPresent;</br>';
    result += 'private $contentTracking = cmpPcTuTracking($trackingZen,$promolinkTracking,$avg_prd,$avg_prod,$lic_lct);</br>';
    result += 'private $promoUri = concat($webUrl, $cidAttrTracking, "&LICR=".$lic_licr."&LT=".$lic_lct."&GEOIP=".$ctry."&ZEN=".$avg_zen_present, $contentTracking);</br></br>';

    result += '// autopromolink</br>';
    result += 'cmpPcTuSendDynamicPromolink ($promoHash, $promoEndDate, $promoUri, $promoStartDate, $promoFreq, $promoCount, $promoAvStatus, $promoDayOfWeek);</br></br>';

    result += '// distribution</br>';
    result += 'if ($IDMARK_C' + cid + 'T != $run or $IDMARK_C' + cid + 'O != $offer) {</br>';
    result += '     if (! exists $IDMARK_C' + cid + 'T) {</br>';
    result += '         private $distribGroup = cmpPcTuDistribGroup($avg_prd,$avg_prod,$avg_avg_ver,$lic_licr,$lic_lct,$AVinZen,$avg_zen_present);</br>';
    result += '         pushbi(true,$cid."e1",$distribGroup);</br>';
    result += '         sethead( $cid."e1", $distribGroup);</br>';
    result += '         pushbi(true,$cid."e2",25);</br>';
    result += '         sethead( $cid."e2", 25);</br>';
    result += '     }</br>';
    result += '     pushbi(true,$cid."e3",$offer);</br>';
    result += '     sethead( $cid."e3", $offer);</br>';
    result += '     pushbi(true,$cid."e4",$run);</br>';
    result += '     sethead( $cid."e4", $run);</br>';
    result += '}</br></br>';

    result += '$IDMARK_C' + cid + 'T = $run;</br>';
    result += '$IDMARK_C' + cid + 'O = $offer;';

    result += '</pre>';
    document.getElementById('result').innerHTML = result;
}