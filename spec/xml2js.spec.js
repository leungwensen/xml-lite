const assert = chai.assert;
import $ from 'jquery';
import XMLLite from 'xml-lite';

describe('xml2js', function description() {
  this.timeout(10000); // 10 seconds before timeout

  function nextFixture(fixtues) {
    if (fixtues.length) {
      const fixture = fixtues.shift();
      it(`test case: ${fixture}`, (done) => {
        $.get(`./fixtures/${fixture}.xml`,
          (xmlContent) => {
            $.get(`./fixtures/${fixture}.json`, (jsonContent) => {
              console.log(XMLLite.xml2js(xmlContent), jsonContent);
              assert.deepEqual(
                XMLLite.xml2js(xmlContent),
                jsonContent,
                `test case by fixture ${fixture} not passed`
              );
              done();
            });
          },
          'text'
        );
      });
      nextFixture(fixtues);
    }
  }

  $.get('./fixtures/files.json', (files) => {
    nextFixture(files);
  });
});
