import {app} from '../../src/app'
import request from 'supertest';


it('Service Status', function (done) {

  setTimeout(done, 5000);
  request(app)
      .get('/status')
      .expect(200)        
      .end(done)
})


it('Not found', function (done) {
  setTimeout(done, 5000);
  request(app)
      .get('/notFoundablePage')
      .expect(404)        
      .end(done)
})

it('Stats get all fields', function (done) {

  setTimeout(done, 5000);
  request(app)
      .get('/stats')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('count_mutant_dna')
      })
      .expect((res) => {
        expect(res.body).toHaveProperty('count_human_dna')
      })
      .expect((res) => {
        expect(res.body).toHaveProperty('ratio')
      })
      .end(done)
})


it('Stats get all fields', function (done) {

  setTimeout(done, 5000);
  request(app)
      .post('/stats')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('count_mutant_dna')
      })
      .expect((res) => {
        expect(res.body).toHaveProperty('count_human_dna')
      })
      .expect((res) => {
        expect(res.body).toHaveProperty('ratio')
      })
      .end(done)
})

it('Test inconsistent lenght', function (done) {

  const req={dna:["GACATCAGCT","AGTCTGTGAC","GCATCTGCTC","TATGATACGA","TCATGTGACT","CACGTACTAC","TAGTGAGTAT","ATAGCTATCA","CGCTACAGCT"]}
  setTimeout(done, 5000);
  request(app)
      .post('/mutant')
      .send(req)
      .expect(403)
      .end(done);
})


it('Test ilegal characteres', function (done) {

  const req={dna:["XACATCAGCT","XGTCTGTGAC","XCATCTGCTC","TATGATACGA","TCATGTGACT","CACGTACTAC","TAGTGAGTAT","ATAGCTATCA","CGCTACAGCT"]}
  setTimeout(done, 5000);
  request(app)
      .post('/mutant')
      .send(req)
      .expect(403)
      .end(done);
})

it('Test ilegal characteres', function (done) {

  const req={dna:["XACATCAGCT","XGTCTGTGAC","XCATCTGCTC","TATGATACGA","TCATGTGACT","CACGTACTAC","TAGTGAGTAT","ATAGCTATCA","CGCTACAGCT"]}
  setTimeout(done, 5000);
  request(app)
      .post('/mutant')
      .send(req)
      .expect(403)
      .end(done);
})

it('Test is Mutant', function (done) {
  const req={dna:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}
  setTimeout(done, 5000);
  request(app)
      .post('/mutant')
      .send(req)
      .expect(200)
      .end(done);
})

it('Test cache', function (done) {
  const req={dna:["CGTACAGATACGCTGAGTCA","GCTGTGATATAGTACATATC","TATGTAGCGCTCGCGTGTAC","AGTGTAGCGTGCGCTGTGGC","TCATCACTATCACACGTGGT","ATGTAGTGTAGTGCTACTGC","ACTCTCTCGCGCACTCGATA","CTACAGTCAGATCACGCATA","CGTCTGAGACGAGTAGCTGC","GTAGAGACATATCGACTCTA","GACTAGTCACTCAGCACATG","CAGCGTGCGATAGATACGAT","CATATGATATGCATGCAGCA","CGCGACGTGTCACATACATG","TAGCGACATGTCATCGTCAT","CTGCACGTAGATCAGTACTC","TGCGAGTATCGCATGTCTCA","GACACTATCGACACGCAGCA","GACTGTCGAGCATGTGTGCG","TCATCACGTGCAGTGAGTGC"]}
  setTimeout(done, 5000);
  request(app)
      .post('/mutant')
      .send(req)
      .expect(200)
      .end(done);
})

it('Test cache', function (done) {
  const req={dna:["CGTACAGATACGCTGAGTCA","GCTGTGATATAGTACATATC","TATGTAGCGCTCGCGTGTAC","AGTGTAGCGTGCGCTGTGGC","TCATCACTATCACACGTGGT","ATGTAGTGTAGTGCTACTGC","ACTCTCTCGCGCACTCGATA","CTACAGTCAGATCACGCATA","CGTCTGAGACGAGTAGCTGC","GTAGAGACATATCGACTCTA","GACTAGTCACTCAGCACATG","CAGCGTGCGATAGATACGAT","CATATGATATGCATGCAGCA","CGCGACGTGTCACATACATG","TAGCGACATGTCATCGTCAT","CTGCACGTAGATCAGTACTC","TGCGAGTATCGCATGTCTCA","GACACTATCGACACGCAGCA","GACTGTCGAGCATGTGTGCG","TCATCACGTGCAGTGAGTGC"]}
  setTimeout(done, 5000);
  request(app)
      .post('/mutant')
      .send(req)
      .expect(200)
      .end(done);
})


it('Test Swagger', function (done) {
  setTimeout(done, 5000);
  request(app)
      .get('/api-docs/#')
      .expect(200)
      .end(done);
})
