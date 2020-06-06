$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat-main__message-list__message" data-message-id=${message.id}>
         <div class="chat-main__message-list__message__name-box">
           <div class="chat-main__message-list__message__name-box__name">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list__message__name-box__date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list__text">
           <p class="chat-main__message-list__text__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__message-list__message" data-message-id=${message.id}>
         <div class="chat-main__message-list__message__name-box">
           <div class="chat-main__message-list__message__name-box__name">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list__message__name-box__date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list__text">
           <p class="chat-main__message-list__text__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $('.chat-main__message-form__input-box__submit-btn').removeAttr('data-disable-with');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  var reloadMessages = function() {
    var last_message_id = $('.chat-main__message-list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});