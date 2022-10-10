interface AboutItem {
  text: string
  link: string
}

export const aboutItems: AboutItem[] = [
  {
    text: 'Feedback',
    link: 'https://www.jetbrains.com/feedback/feedback.jsp?product=YouTrack',
  },
  {
    text: 'FAQ',
    link: 'https://youtrack-support.jetbrains.com/hc/en-us/categories/' +
      '200817415-FAQ',
  },
  {
    text: 'Documentation',
    link: 'https://www.jetbrains.com/help/youtrack/cloud/2022.2/' +
      'introduction-to-youtrack-cloud.html',
  },
  {
    text: 'Video Demos',
    link: 'https://www.youtube.com/playlist?list=' +
      'PLQ176FUIyIUa7KseWXpRVUYQf0jEB1jsj',
  },
  {
    text: 'Service Status',
    link: 'https://www.jetbrains.com/youtrack/incloud/status/',
  },
  {
    text: 'Maintenance Calendar',
    link: 'https://www.jetbrains.com/help/youtrack/cloud/2022.2/' +
      'youtrack-cloud-maintenance-calendar.html',
  },
  {
    text: 'Support',
    link: 'https://youtrack-support.jetbrains.com/hc/en-us',
  },
];
