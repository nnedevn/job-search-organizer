$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });

  $('.addToAppliedJob').click(function (e) {
    e.preventDefault();
    console.log($(this).attr('data-jobId'));

    $.ajax({
      url: '/profile/fav/' + $(this).attr('data-jobId'),
      method: 'PUT',
      data:
        { appliedFor: 'true' }
    }).done(function () {
      window.location.href = '/profile/fav';
    });
  });

  $('.removeFromAppliedJob').click(function (e) {
    e.preventDefault();

    $.ajax({
      url: '/profile/fav/' + $(this).attr('data-jobId'),
      method: 'PUT',
      data:
        { appliedFor: '' }
    }).done(function () {
      window.location.href = '/profile/applied/';
    });
  });

  $('.deleteJob').click(function (e) {
    e.preventDefault();

    $.ajax({
      url: '/profile/fav/' + $(this).attr('data-jobId'),
      method: 'DELETE',
    }).done(function () {
      window.location.href = '/profile/fav/';
    });
  });
});
