            <Geosuggest
              className="geosuggest"
              placeholder="Start typing!"
              initialValue="San Francisco"
              onSuggestSelect={this.onSuggestSelect}
              location={new google.maps.LatLng(53.558572, 9.9278215)}
              radius="20" />