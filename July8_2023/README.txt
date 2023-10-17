README: 

07/08/2023

Input files for Candida albicans database updated on July 8, 2023

---------------------------------------------------

Folders Included: 


C_albicans_mapped_names_Fu2021_6638_genes.tsv
- 6,638 C. albicans genes and their mapped names based on C_albicans_SC5314_version_A22-s07-m01-r186_chromosomal_feature.tab and C_albicans_SC5314_ORF19_Assembly22_mapping.tab retreived on July 7, 2023
- Should use the unique "Feature name" as the primary key index for the database, and make sure the other columns in this file are always associated with the key index in the database
- At the first stage, we should allow the users to search for a mutant based on one of the following input attributes: Feature name, ORF ID, Common


Calbicans_mutant_features_gene_essentiality.xlsx
- Various attributes for the 6,638 genes


C_albicans_GRACE_essentiality_Fu2021.tsv
- Mutants in the GRACE collection, their experimental details (Plate & Position), and essentiality verdict
- The rows without a feature name are usually some positions in certain plates for control experiments; these can be skipped now but need to be kept in mind
- Note that there are 18 mutants with duplicated presence in multiple plate. Need to show all the associated plates in the entry of the same mutant (gene)


C_albicans_GRACEv2_essentiality_Fu2021.tsv
- Mutants in the GRACEv2 collection, their experimental details (Plate & Position), and essentiality verdict
- The rows without a feature name are usually some positions in certain plates for control experiments; these can be skipped now but need to be kept in mind


2021 Essentiality plate images
- Include folders of plate pictures for GRACE and GRACEv2 experiments (DOX & No DOX); need to be matched for the corresponding mutants in the database