import React from 'react';
import CSVTableAdapter from '../src/routes/app/models/CsvTableAdapter';

const TESTARRAY = [
    'Ad Soyad;Öğrenci Telefonu;Veli 1 Adı;Veli 1 Telefonu',
    'erdem ekin;1;mehmet;1092',
    'veli ayse;2;veli;1019',
    'tevfik fatma;3;deli;1001',
    'erdem ekin;1;mehmet;1092',
    'veli ayse;2;veli;1019',
    'tevfik fatma;3;deli;1001',
    'erdem ekin;1;mehmet;1092',
    'veli ayse;2;veli;1019',
    'tevfik fatma;3;deli;1001',
    'erdem ekin;1;mehmet;1092',
    'veli ayse;2;veli;1019',
    'tevfik fatma;3;deli;1001',
    'erdem ekin;1;mehmet;1092',
    'veli ayse;2;veli;1019',
    'tevfik fatma;3;deli;1001',
    'erdem ekin;1;mehmet;1092',
    'veli ayse;2;veli;1019',
    'tevfik fatma;3;deli;1001',
    'erdem ekin;1;mehmet;1092',
    'veli ayse;2;veli;1019',
    'tevfik fatma;3;deli;1001',
    'erdem ekin;1;mehmet;1092',
    'veli ayse;2;veli;1019',
    'tevfik fatma;3;deli;1001'
];



describe('CSVTableAdapter TestSuite' , () => {
    
    test('getColumnMapping should return array with correct length',() => {
        expect(CSVTableAdapter.getColumnMapping(TESTARRAY)).toHaveProperty('length',4);
    });

    test('createJSONArrayFromCsvData should return JSONArray with correct indexes and content',() => {
        var result = CSVTableAdapter.createJSONArrayFromCsvData(TESTARRAY);
        expect(result).toHaveProperty('length',TESTARRAY.length - 1);
        expect(result[0].name).toBe('erdem ekin');
        expect(result[0].parent1Name).toBe('mehmet');
        expect(result[0].parent1Phone).toBe('1092');
    });

});
