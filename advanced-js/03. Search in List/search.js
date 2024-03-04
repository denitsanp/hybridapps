
function search() {
  let searchText = $('#searchText').val().toLowerCase();
  let matches = 0;

  $('#towns li').each(function() {
      let city = $(this);
      if (city.text().toLowerCase().includes(searchText)) {
          city.css('font-weight', 'bold');
          matches++;
      } else {
          city.css('font-weight', ''); 
      }
  });

  $('#result').text(`${matches} matches found.`);
}


